import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAG_IDS } from './data/tags';

const approvedTagIds = new Set(TAG_IDS);

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({
		base: './src/content/blog',
		pattern: '**/index.{md,mdx}',
		generateId: ({ entry }) => entry.replace(/\/index\.(md|mdx)$/, ''),
	}),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z
				.array(z.string())
				.default([])
				.refine((tags) => new Set(tags).size === tags.length, 'Tags must not contain duplicates.')
				.refine(
					(tags) => tags.every((tag) => approvedTagIds.has(tag)),
					'Tags must be explicitly approved in src/data/tags.ts before use.',
				),
		}),
});

export const collections = { blog };
