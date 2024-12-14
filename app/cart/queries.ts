import { cartFragment } from "@/cart/constants"
import { queryOptions } from "@tanstack/react-query"
import * as cart from "./functions"

export const cartByIdQuery = () =>
   queryOptions({
      queryKey: ["cart_by_id"],
      queryFn: async () => {
         const res = await cart.byId()
         if (!res) return null
         return res
      },
   })

export const cartByIdGraphQLQuery = `
     query cartByIdGraphQLQuery($cartId: ID!) {
       cart(id: $cartId) {
         ...cart
       }
     }
     ${cartFragment}
   `
