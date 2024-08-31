export const MOBILE_BREAKPOINT = 768

export const env = {
   SITE_NAME: "Commerce",
}

export type SortFilterItem = {
   title: string
   slug: string | null
   sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE"
   reverse: boolean
}

export const defaultSort: SortFilterItem = {
   title: "Relevance",
   slug: null,
   sortKey: "RELEVANCE",
   reverse: false,
}

export const sorting: SortFilterItem[] = [
   defaultSort,
   {
      title: "Популярне",
      slug: "trending-desc",
      sortKey: "BEST_SELLING",
      reverse: false,
   }, // asc
   {
      title: "Спочатку нове",
      slug: "latest-desc",
      sortKey: "CREATED_AT",
      reverse: true,
   },
   {
      title: "Спочатку дешевше",
      slug: "price-asc",
      sortKey: "PRICE",
      reverse: false,
   }, // asc
   {
      title: "Спочатку дорожче",
      slug: "price-desc",
      sortKey: "PRICE",
      reverse: true,
   },
]

export const TAGS = {
   collections: "collections",
   products: "products",
   cart: "cart",
}

export const HIDDEN_PRODUCT_TAG = "hidden"
export const DEFAULT_PRODUCT_TITLE = "Default Title"
