"use server"

import { TAGS } from "@/lib/constants"
import { addToCart } from "@/lib/shopify"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const addItem = async (
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
   _prevState: any,
   selectedVariantId: string | undefined,
) => {
   const cartId = cookies().get("cartId")?.value

   if (!cartId || !selectedVariantId) {
      return "Error adding item to cart"
   }

   try {
      await addToCart(cartId, [
         { merchandiseId: selectedVariantId, quantity: 1 },
      ])
      revalidateTag(TAGS.cart)
   } catch (_e) {
      return "Error adding item to cart"
   }
}
