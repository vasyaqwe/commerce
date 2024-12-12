import { cartByIdQuery } from "@/cart/queries"
import { updateCartTotals } from "@/cart/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useServerFn } from "@tanstack/start"
import * as cartFns from "../functions"

export function useUpdateCartItem() {
   const queryClient = useQueryClient()
   const { data: cart } = useQuery(cartByIdQuery())

   const addItemFn = useServerFn(cartFns.addItem)
   const updateItemFn = useServerFn(cartFns.updateItem)
   const removeItemFn = useServerFn(cartFns.removeItem)

   const updateItem = useMutation({
      mutationKey: ["cart_update_item"],
      mutationFn: async ({
         merchandiseId,
         quantity,
      }: {
         merchandiseId: string
         quantity: number
      }) => {
         if (!cart) return

         const lineItem = cart.lines.find(
            (line) => line.merchandise.id === merchandiseId,
         )

         if (lineItem?.id) {
            if (quantity === 0) {
               await removeItemFn({ data: { lineIds: [lineItem.id] } })
            } else {
               await updateItemFn({
                  data: {
                     lines: [
                        {
                           id: lineItem.id,
                           merchandiseId,
                           quantity,
                        },
                     ],
                  },
               })
            }
         } else if (quantity > 0) {
            await addItemFn({ data: { lines: [{ merchandiseId, quantity }] } })
         }
      },
      onMutate: async ({ merchandiseId, quantity }) => {
         await queryClient.cancelQueries(cartByIdQuery())
         const previousCart = queryClient.getQueryData(cartByIdQuery().queryKey)
         if (previousCart) {
            const updatedLines = previousCart.lines
               .map((item) => {
                  if (item.merchandise.id === merchandiseId) {
                     const currentPrice =
                        parseFloat(item.cost.totalAmount.amount) / item.quantity
                     const newTotalAmount = (currentPrice * quantity).toFixed(2)
                     return {
                        ...item,
                        quantity,
                        cost: {
                           ...item.cost,
                           totalAmount: {
                              ...item.cost.totalAmount,
                              amount: newTotalAmount,
                           },
                        },
                     }
                  }
                  return item
               })
               .filter((item) => item.quantity > 0)

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
            queryClient.setQueryData(cartByIdQuery().queryKey, updatedCart)
         }
         return { previousCart }
      },
      onError: (_, __, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(
               cartByIdQuery().queryKey,
               context.previousCart,
            )
         }
      },
      onSettled: () => {
         if (
            queryClient.isMutating({ mutationKey: ["cart_update_item"] }) !== 1
         )
            return

         return queryClient.invalidateQueries(cartByIdQuery())
      },
   })

   return {
      updateItem,
   }
}
