## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Publishing workflow

- Accept a Markdown file or pasted Markdown plus conversation image attachments.
- Treat an unspecified publishing request as preview-only. Push only when the user explicitly asks to publish or directly publish.
- Preserve the author's prose unless the user explicitly asks for editing. Mechanical front matter, image references, filenames, alt text, and formatting fixes are allowed.
- Store every post and its images in `src/content/blog/<ascii-slug>/`, with the article at `index.md`.
- Preserve an existing post's slug and URL when updating it. Add `updatedDate` for a published content update.
- Run `npm run verify` before publishing. A content publication commit must not include unrelated feature, style, or documentation changes.
- The repository is public. Never push private drafts or personal information used only for testing.

### Tag authorization boundary

- Tags may only be specified or explicitly approved by the site owner.
- An agent may suggest tags in conversation, but must not add a suggested tag to a post or to `src/data/tags.ts` without explicit approval.
- Do not infer tags from article content, reuse an existing tag without approval for that article, or silently create spelling variants.
- A post with no approved tag must use `tags: []`.
- `src/data/tags.ts` is the canonical registry. Post front matter stores stable registry IDs, not display labels.

### Preview and direct publish

- Preview: prepare the post, run verification, and provide desktop/mobile visual previews without pushing.
- Direct publish: prepare the post, run verification, commit, push `main`, and verify the deployment result.
- Before either mode, report the proposed title, slug, date, description, image placement, cover, and tags. In direct-publish mode, proceed without another confirmation unless a material content ambiguity or privacy risk remains.
