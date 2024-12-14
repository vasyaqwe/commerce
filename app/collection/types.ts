import type { SEO } from "@/seo/types"

export type ShopifyCollection = {
   handle: string
   title: string
   description: string
   seo: SEO
   updatedAt: string
}

export type Collection = ShopifyCollection & {
   path: string
}
