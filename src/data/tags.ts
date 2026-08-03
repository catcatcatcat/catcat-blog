export interface TagDefinition {
	label: string;
}

/**
 * Canonical tag registry.
 *
 * A tag may only be added after the site owner explicitly specifies or approves it.
 * Agents may suggest tags, but must never insert a suggestion here on their own.
 */
export const TAGS: Record<string, TagDefinition> = {};

export const TAG_IDS = Object.freeze(Object.keys(TAGS));

export function getTagLabel(id: string): string {
	const definition = TAGS[id];

	if (!definition) {
		throw new Error(`Unknown tag: ${id}`);
	}

	return definition.label;
}
