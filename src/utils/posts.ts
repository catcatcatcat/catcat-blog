import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
	return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPosts(): Promise<BlogPost[]> {
	return sortPostsByDate(await getCollection('blog'));
}

export function getPostUrl(post: BlogPost): string {
	return `/blog/${post.id}/`;
}
