import type { Connection, Image, Money } from "@/lib/shopify/types"

export type ShopifyCart = {
   id: string | undefined
   checkoutUrl: string
   cost: {
      subtotalAmount: Money
      totalAmount: Money
      totalTaxAmount: Money
   }
   lines: Connection<CartItem>
   totalQuantity: number
}

export type Cart = Omit<ShopifyCart, "lines"> & {
   lines: CartItem[]
}

export type CartProduct = {
   id: string
   handle: string
   title: string
   featuredImage: Image
}

export type CartItem = {
   id: string | undefined
   quantity: number
   cost: {
      totalAmount: Money
   }
   merchandise: {
      id: string
      title: string
      selectedOptions: {
         name: string
         value: string
      }[]
      product: CartProduct
   }
}
