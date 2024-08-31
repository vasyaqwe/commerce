"use server"

import { TAGS } from "@/lib/constants"
import {
   addToCart,
   createCart,
   getCart,
   removeFromCart,
   updateCart,
} from "@/lib/shopify"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const removeItem = async (_prevState: any, merchandiseId: string) => {
   const cartId = cookies().get("cartId")?.value

   if (!cartId) {
      return "Missing cart ID"
   }

   try {
      const cart = await getCart(cartId)

      if (!cart) {
         return "Error fetching cart"
      }

      const lineItem = cart.lines.find(
         (line) => line.merchandise.id === merchandiseId,
      )

      if (lineItem?.id) {
         await removeFromCart(cartId, [lineItem.id])
         revalidateTag(TAGS.cart)
      } else {
         return "Item not found in cart"
      }
   } catch (_e) {
      return "Error removing item from cart"
   }
}

export const updateItemQuantity = async (
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
   _prevState: any,
   payload: {
      merchandiseId: string
      quantity: number
   },
) => {
   const cartId = cookies().get("cartId")?.value

   if (!cartId) {
      return "Missing cart ID"
   }

   const { merchandiseId, quantity } = payload

   try {
      const cart = await getCart(cartId)

      if (!cart) {
         return "Error fetching cart"
      }

      const lineItem = cart.lines.find(
         (line) => line.merchandise.id === merchandiseId,
      )

      if (lineItem?.id) {
         if (quantity === 0) {
            await removeFromCart(cartId, [lineItem.id])
         } else {
            await updateCart(cartId, [
               {
                  id: lineItem.id,
                  merchandiseId,
                  quantity,
               },
            ])
         }
      } else if (quantity > 0) {
         // If the item doesn't exist in the cart and quantity > 0, add it
         await addToCart(cartId, [{ merchandiseId, quantity }])
      }

      revalidateTag(TAGS.cart)
   } catch (e) {
      console.error(e)
      return "Error updating item quantity"
   }
}

export const redirectToCheckout = async () => {
   const cartId = cookies().get("cartId")?.value

   if (!cartId) {
      return "Missing cart ID"
   }

   const cart = await getCart(cartId)

   if (!cart) {
      return "Error fetching cart"
   }

   redirect(cart.checkoutUrl)
}

export const createCartAndSetCookie = async () => {
   const cart = await createCart()
   cookies().set("cartId", cart.id ?? "")
}
