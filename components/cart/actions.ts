"use server"

import { createCart, reshapeCart, shopifyFetch } from "@/lib/shopify"
import {
   addToCartMutation,
   editCartItemsMutation,
   removeFromCartMutation,
} from "@/lib/shopify/mutations/cart"
import type {
   Cart,
   ShopifyAddToCartOperation,
   ShopifyRemoveFromCartOperation,
   ShopifyUpdateCartOperation,
} from "@/lib/shopify/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const removeFromCart = async (
   cartId: string,
   lineIds: string[],
): Promise<Cart> => {
   const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
      query: removeFromCartMutation,
      variables: {
         cartId,
         lineIds,
      },
      cache: "no-store",
   })

   return reshapeCart(res.body.data.cartLinesRemove.cart)
}

export const addToCart = async (
   cartId: string,
   lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> => {
   const res = await shopifyFetch<ShopifyAddToCartOperation>({
      query: addToCartMutation,
      variables: {
         cartId,
         lines,
      },
      cache: "no-store",
   })
   return reshapeCart(res.body.data.cartLinesAdd.cart)
}

export const updateCart = async (
   cartId: string,
   lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> => {
   const res = await shopifyFetch<ShopifyUpdateCartOperation>({
      query: editCartItemsMutation,
      variables: {
         cartId,
         lines,
      },
      cache: "no-store",
   })

   return reshapeCart(res.body.data.cartLinesUpdate.cart)
}

export const redirectToCheckout = async (checkoutUrl: string) =>
   redirect(checkoutUrl)

export const createCartAndSetCookie = async () => {
   const cart = await createCart()
   if (!cart.id) return "Error creating cart"
   cookies().set("cartId", cart.id)
}
