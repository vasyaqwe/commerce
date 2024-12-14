import {
   addCartItemMutation,
   createCartMutation,
   removeCartItemMutation,
   updateCartItemMutation,
} from "@/cart/mutations"
import { cartByIdGraphQLQuery } from "@/cart/queries"
import type { ShopifyCart } from "@/cart/types"
import { reshapeCart } from "@/cart/utils"
import { ServerFnError } from "@/error"
import { shopifyFetch } from "@/lib/shopify"
import { createMiddleware, createServerFn } from "@tanstack/start"
import { zodValidator } from "@tanstack/zod-adapter"
import { getCookie, setCookie } from "vinxi/http"
import { z } from "zod"

export const cartMiddleware = createMiddleware().server(({ next }) => {
   const cartId = getCookie("cart_id")
   if (!cartId)
      throw new ServerFnError({
         code: "BAD_REQUEST",
         message: "Cart doesn't exist",
      })

   return next({
      context: {
         cartId,
      },
   })
})

export const byId = createServerFn({ method: "GET" }).handler(async () => {
   const cartId = getCookie("cart_id")
   if (!cartId) return null

   const res = (await shopifyFetch({
      query: cartByIdGraphQLQuery,
      variables: { cartId },
   })) as {
      cart: ShopifyCart
   }

   // Old carts becomes `null` when you checkout.
   if (!res.cart) return null

   return reshapeCart(res.cart)
})

export const create = createServerFn({ method: "GET" }).handler(async () => {
   const res = (await shopifyFetch({
      query: createCartMutation,
   })) as { cartCreate: { cart: ShopifyCart } }

   const cart = reshapeCart(res.cartCreate.cart)
   if (!cart.id)
      throw new ServerFnError({
         code: "BAD_REQUEST",
         message: "Failed to create cart",
      })

   setCookie("cart_id", cart.id)
})

export const addItem = createServerFn({ method: "POST" })
   .middleware([cartMiddleware])
   .validator(
      zodValidator(
         z.object({
            lines: z.array(
               z.object({
                  merchandiseId: z.string(),
                  quantity: z.number(),
               }),
            ),
         }),
      ),
   )
   .handler(async ({ data, context }) => {
      const res = (await shopifyFetch({
         query: addCartItemMutation,
         variables: {
            cartId: context.cartId,
            lines: data.lines,
         },
      })) as {
         cartLinesAdd: {
            cart: ShopifyCart
         }
      }

      return reshapeCart(res.cartLinesAdd.cart)
   })

export const removeItem = createServerFn({ method: "POST" })
   .middleware([cartMiddleware])
   .validator(
      zodValidator(
         z.object({
            lineIds: z.array(z.string()),
         }),
      ),
   )
   .handler(async ({ data, context }) => {
      const res = (await shopifyFetch({
         query: removeCartItemMutation,
         variables: {
            cartId: context.cartId,
            lineIds: data.lineIds,
         },
      })) as {
         cartLinesRemove: {
            cart: ShopifyCart
         }
      }

      return reshapeCart(res.cartLinesRemove.cart)
   })

export const updateItem = createServerFn({ method: "POST" })
   .middleware([cartMiddleware])
   .validator(
      zodValidator(
         z.object({
            lines: z.array(
               z.object({
                  id: z.string(),
                  merchandiseId: z.string(),
                  quantity: z.number(),
               }),
            ),
         }),
      ),
   )
   .handler(async ({ data, context }) => {
      const res = (await shopifyFetch({
         query: updateCartItemMutation,
         variables: {
            cartId: context.cartId,
            lines: data.lines,
         },
      })) as {
         cartLinesUpdate: {
            cart: ShopifyCart
         }
      }

      return reshapeCart(res.cartLinesUpdate.cart)
   })
