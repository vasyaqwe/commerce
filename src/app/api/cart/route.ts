import type { ShopifyCartOperation } from "@/cart/types"
import { reshapeCart } from "@/cart/utils"
import { TAGS, shopifyFetch } from "@/lib/shopify"
import { getCartQuery } from "@/lib/shopify/queries/cart"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async (): Promise<NextResponse> => {
   const cartId = cookies().get("cartId")?.value

   if (!cartId) return NextResponse.json(null)

   const res = await shopifyFetch<ShopifyCartOperation>({
      query: getCartQuery,
      variables: { cartId },
      tags: [TAGS.cart],
   })

   // Old carts becomes `null` when you checkout.
   if (!res.body.data.cart) return NextResponse.json(null)

   return NextResponse.json(reshapeCart(res.body.data.cart))
}
