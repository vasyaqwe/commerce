import type { colorFilterSlugs, sortFilterSlugs } from "@/filter/constants"

export type SortFilterSlug = (typeof sortFilterSlugs)[number]
export type ColorFilterSlug = (typeof colorFilterSlugs)[number]
