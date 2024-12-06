import { getCartQueryOptions } from "@/cart/queries"
import { createOrUpdateCartItem, updateCartTotals } from "@/cart/utils"
import type { Product, ProductVariant } from "@/lib/shopify/types"
import { pushModal } from "@/modals"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useServerFn } from "@tanstack/start"
import * as cartFns from "../functions"

export function useAddCartItem() {
   const queryClient = useQueryClient()

   const addItemFn = useServerFn(cartFns.addItem)
   const addItem = useMutation({
      mutationKey: ["cart_add_item"],
      mutationFn: async ({
         variant,
      }: { variant: ProductVariant; product: Product }) => {
         await addItemFn({
            data: { lines: [{ merchandiseId: variant.id, quantity: 1 }] },
         })
      },
      onMutate: async ({ variant, product }) => {
         await queryClient.cancelQueries(getCartQueryOptions())

         const previousCart = queryClient.getQueryData(
            getCartQueryOptions().queryKey,
         )

         if (previousCart) {
            const existingItem = previousCart.lines.find(
               (item) => item.merchandise.id === variant.id,
            )
            const updatedItem = createOrUpdateCartItem(
               existingItem,
               variant,
               product,
            )

            const updatedLines = existingItem
               ? previousCart.lines.map((item) =>
                    item.merchandise.id === variant.id ? updatedItem : item,
                 )
               : [...previousCart.lines, updatedItem]

            const totalQuantity = updatedLines.reduce(
               (total, item) => total + item.quantity,
               0,
            )

            const updatedCart = {
               ...previousCart,
               ...updateCartTotals(updatedLines),
               lines: updatedLines,
               totalQuantity,
            }

            queryClient.setQueryData(
               getCartQueryOptions().queryKey,
               updatedCart,
            )
         }

         pushModal("cart")

         return { previousCart }
      },
      onError: (_, __, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(
               getCartQueryOptions().queryKey,
               context.previousCart,
            )
         }
      },
      onSettled: () => {
         if (queryClient.isMutating({ mutationKey: ["cart_add_item"] }) !== 1)
            return

         return queryClient.invalidateQueries(getCartQueryOptions())
      },
   })

   return {
      addItem,
   }
}
