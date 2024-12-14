import type {
   colorFilterSlugs,
   productTypeFilterSlugs,
   sortFilterSlugs,
} from "@/filter/constants"

export type SortFilterSlug = (typeof sortFilterSlugs)[number]
export type ColorFilterSlug = (typeof colorFilterSlugs)[number]
export type ProductTypeFilterSlug = (typeof productTypeFilterSlugs)[number]
