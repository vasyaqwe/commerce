export type Maybe<T> = T | null

export type Connection<T> = {
   edges: Array<Edge<T>>
}

export type Edge<T> = {
   node: T
}

export type Collection = ShopifyCollection & {
   path: string
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

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
   variants: ProductVariant[]
   images: Image[]
}

export type ProductOption = {
   id: string
   name: string
   values: string[]
}

export type ProductVariant = {
   id: string
   title: string
   availableForSale: boolean
   selectedOptions: {
      name: string
      value: string
   }[]
   price: Money
}

export type SEO = {
   title: string
   description: string
}

export type ShopifyCollection = {
   handle: string
   title: string
   description: string
   seo: SEO
   updatedAt: string
}

export type ShopifyProduct = {
   id: string
   handle: string
   availableForSale: boolean
   title: string
   description: string
   descriptionHtml: string
   options: ProductOption[]
   priceRange: {
      maxVariantPrice: Money
      minVariantPrice: Money
   }
   variants: Connection<ProductVariant>
   featuredImage: Image
   images: Connection<Image>
   seo: SEO
   tags: string[]
   updatedAt: string
}

export type ShopifyCollectionOperation = {
   data: {
      collection: ShopifyCollection
   }
   variables: {
      handle: string
   }
}

export type ShopifyCollectionProductsOperation = {
   data: {
      collection: {
         products: Connection<ShopifyProduct>
      }
   }
   variables: {
      handle: string
      reverse?: boolean
      sortKey?: string
   }
}

export type ShopifyCollectionsOperation = {
   data: {
      collections: Connection<ShopifyCollection>
   }
}

export type ShopifyMenuOperation = {
   data: {
      menu?: {
         items: {
            title: string
            url: string
         }[]
      }
   }
   variables: {
      handle: string
   }
}

export type ShopifyPageOperation = {
   data: { pageByHandle: Page }
   variables: { handle: string }
}

export type ShopifyPagesOperation = {
   data: {
      pages: Connection<Page>
   }
}

export type ShopifyProductOperation = {
   data: { product: ShopifyProduct }
   variables: {
      handle: string
   }
}

export type ShopifyProductRecommendationsOperation = {
   data: {
      productRecommendations: ShopifyProduct[]
   }
   variables: {
      productId: string
   }
}

export type ShopifyProductsOperation = {
   data: {
      products: Connection<ShopifyProduct>
   }
   variables: {
      query?: string
      reverse?: boolean
      sortKey?: string
   }
}
