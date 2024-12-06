import { getCartQueryOptions } from "@/cart/queries"
import { updateCartTotals } from "@/cart/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useServerFn } from "@tanstack/start"
import * as cartFns from "../functions"

export function useRemoveCartItem() {
   const queryClient = useQueryClient()
   const { data: cart } = useQuery(getCartQueryOptions())

   const removeItemFn = useServerFn(cartFns.removeItem)
   const removeItem = useMutation({
      mutationKey: ["cart_remove_item"],
      mutationFn: async (merchandiseId: string) => {
         const lineItem = cart?.lines.find(
            (line) => line.merchandise.id === merchandiseId,
         )

         if (!lineItem?.id) return

         await removeItemFn({ data: { lineIds: [lineItem.id] } })
      },
      onMutate: async (merchandiseId) => {
         await queryClient.cancelQueries(getCartQueryOptions())

         const previousCart = queryClient.getQueryData(
            getCartQueryOptions().queryKey,
         )

         if (previousCart) {
            const updatedLines = previousCart.lines.filter(
               (item) => item.merchandise.id !== merchandiseId,
            )

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
         if (
            queryClient.isMutating({ mutationKey: ["cart_remove_item"] }) !== 1
         )
            return

         return queryClient.invalidateQueries(getCartQueryOptions())
      },
   })

   return {
      removeItem,
   }
}
