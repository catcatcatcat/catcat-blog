import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const readOutput = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('build emits every required public route', async () => {
	await Promise.all(
		[
			'blog/index.html',
			'blog/hello-world/index.html',
			'tags/index.html',
			'search/index.html',
			'archive/index.html',
			'rss.xml',
			'sitemap-index.xml',
		].map((path) => access(new URL(`../dist/${path}`, import.meta.url))),
	);
});

test('only article pages opt into Pagefind indexing', async () => {
	const [article, blog, tags, search, archive] = await Promise.all(
		[
			'blog/hello-world/index.html',
			'blog/index.html',
			'tags/index.html',
			'search/index.html',
			'archive/index.html',
		].map(readOutput),
	);

	assert.match(article, /<article data-pagefind-body/);
	for (const aggregatePage of [blog, tags, search, archive]) {
		assert.doesNotMatch(aggregatePage, /data-pagefind-body/);
	}
});

test('search bundle and current Component UI are generated', async () => {
	const searchPage = await readOutput('search/index.html');
	await access(new URL('../dist/pagefind/pagefind-entry.json', import.meta.url));
	await access(new URL('../dist/pagefind/pagefind-component-ui.js', import.meta.url));
	assert.match(searchPage, /<pagefind-input/);
	assert.match(searchPage, /<pagefind-results/);
	assert.match(searchPage, /找到 \[COUNT\] 篇/);
});

test('archive is date-grouped and tags remain empty without owner approval', async () => {
	const [archive, tags] = await Promise.all([
		readOutput('archive/index.html'),
		readOutput('tags/index.html'),
	]);

	assert.match(archive, /<details open/);
	const postsPublishedIn2026 = [...archive.matchAll(/datetime="2026-/g)].length;
	assert.ok(postsPublishedIn2026 > 0);
	assert.match(archive, new RegExp(`2026（${postsPublishedIn2026}）`));
	assert.match(archive, /href="\/blog\/hello-world\/"/);
	assert.match(tags, /目前尚未指定任何 tag/);
	assert.doesNotMatch(tags, /class="tag-list"/);
});
