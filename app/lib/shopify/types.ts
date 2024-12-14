import type { SEO } from "@/seo/types"

export type Maybe<T> = T | null

export type Connection<T> = {
   edges: Array<Edge<T>>
}

export type Edge<T> = {
   node: T
}

export type Image = {
   url: string
   altText: string
   width: number
   height: number
}

export type Menu = {
   title: string
   path: string
}

export type Money = {
   amount: string
   currencyCode: string
}

export type Page = {
   id: string
   title: string
   handle: string
   body: string
   bodySummary: string
   seo?: SEO
   createdAt: string
   updatedAt: string
}
