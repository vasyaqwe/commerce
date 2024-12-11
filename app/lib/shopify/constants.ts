import type { ColorFilterSlug, SortFilterSlug } from "@/lib/shopify/types"

export const DEFAULT_PRODUCT_TITLE = "Default Title"
export const HIDDEN_PRODUCT_TAG = "hidden"

export const sortFilterSlugs = [
   "relevance",
   "trending_desc",
   "latest_desc",
   "price_asc",
   "price_desc",
] as const

export const sortFilterSlugToKey: Record<SortFilterSlug, string> = {
   relevance: "RELEVANCE",
   trending_desc: "BEST_SELLING",
   latest_desc: "CREATED_AT",
   price_asc: "PRICE",
   price_desc: "PRICE",
}

export const sortFilterSlugToReverse: Record<SortFilterSlug, boolean> = {
   relevance: false,
   trending_desc: false,
   latest_desc: true,
   price_asc: false,
   price_desc: true,
}

export const sortFilterSlugToTitle: Record<SortFilterSlug, string> = {
   relevance: "Релевантне",
   trending_desc: "Популярне",
   latest_desc: "Спочатку нове",
   price_asc: "Спочатку дешевше",
   price_desc: "Спочатку дорожче",
}

export const colorFilterSlugs = [
   "червоний",
   "синій",
   "зелений",
   "чорний",
   "білий",
] as const

export const colorFilterSlugToClassName: Record<ColorFilterSlug, string> = {
   червоний: "bg-red-500",
   синій: "bg-blue-500",
   зелений: "bg-green-500",
   чорний: "bg-black",
   білий: "bg-white",
}

export const sizeFilterSlugs = ["xs", "s", "m", "l", "xl", "2xl"] as const

// export const styleFilter = {
//    title: "Стиль",
//    slug: "style",
//    values: ["Казуальний", "Офіційний", "Спортивний", "Вінтажний"],
// }

// export const materialFilter = {
//    title: "Material",
//    slug: "material",
//    values: ["Бавовна", "Полієстер", "Шовк", "Джинс"],
// }
