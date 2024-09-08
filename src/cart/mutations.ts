import { addToCart, removeFromCart, updateCart } from "@/cart/actions"
import { cartQueryOptions } from "@/cart/queries"
import type { Cart } from "@/cart/types"
import { createOrUpdateCartItem, updateCartTotals } from "@/cart/utils"
import type { Product, ProductVariant } from "@/lib/shopify/types"
import { pushModal } from "@/modals"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useRemoveCartItemMutation() {
   const queryClient = useQueryClient()
   const { data: cart } = useQuery(cartQueryOptions())

   return useMutation({
      mutationKey: ["remove-cart-item"],
      mutationFn: async (merchandiseId: string) => {
         const lineItem = cart?.lines.find(
            (line) => line.merchandise.id === merchandiseId,
         )

         if (!lineItem?.id) return "Item not found in cart"

         if (!cart?.id) return "Cart not found"

         await removeFromCart(cart.id, [lineItem.id])
      },
      onMutate: async (merchandiseId) => {
         await queryClient.cancelQueries(cartQueryOptions())

         const previousCart = queryClient.getQueryData<Cart>(
            cartQueryOptions().queryKey,
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

            queryClient.setQueryData(cartQueryOptions().queryKey, updatedCart)
         }

         return { previousCart }
      },
      onError: (_, __, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(
               cartQueryOptions().queryKey,
               context.previousCart,
            )
         }
      },
      onSettled: () => {
         if (
            queryClient.isMutating({ mutationKey: ["remove-cart-item"] }) !== 1
         )
            return

         return queryClient.invalidateQueries(cartQueryOptions())
      },
   })
}

export function useAddToCartMutation() {
   const queryClient = useQueryClient()
   const { data: cart } = useQuery(cartQueryOptions())

   return useMutation({
      mutationKey: ["add-to-cart"],
      mutationFn: async ({
         variant,
      }: { variant: ProductVariant; product: Product }) => {
         if (!cart?.id) return "Cart not found"

         await addToCart(cart.id, [{ merchandiseId: variant.id, quantity: 1 }])
      },
      onMutate: async ({ variant, product }) => {
         await queryClient.cancelQueries(cartQueryOptions())

         const previousCart = queryClient.getQueryData<Cart>(
            cartQueryOptions().queryKey,
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

            queryClient.setQueryData(cartQueryOptions().queryKey, updatedCart)
         }

         pushModal("cart")

         return { previousCart }
      },
      onError: (_, __, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(
               cartQueryOptions().queryKey,
               context.previousCart,
            )
         }
      },
      onSettled: () => {
         if (queryClient.isMutating({ mutationKey: ["add-to-cart"] }) !== 1)
            return

         return queryClient.invalidateQueries(cartQueryOptions())
      },
   })
}

export function useUpdateCartItemMutation() {
   const queryClient = useQueryClient()
   const { data: cart } = useQuery(cartQueryOptions())

   return useMutation({
      mutationKey: ["update-cart-item"],
      mutationFn: async ({
         merchandiseId,
         quantity,
      }: {
         merchandiseId: string
         quantity: number
      }) => {
         if (!cart?.id) return "Cart not found"

         const lineItem = cart.lines.find(
            (line) => line.merchandise.id === merchandiseId,
         )

         if (lineItem?.id) {
            if (quantity === 0) {
               await removeFromCart(cart.id, [lineItem.id])
            } else {
               await updateCart(cart.id, [
                  {
                     id: lineItem.id,
                     merchandiseId,
                     quantity,
                  },
               ])
            }
         } else if (quantity > 0) {
            await addToCart(cart.id, [{ merchandiseId, quantity }])
         }
      },
      onMutate: async ({ merchandiseId, quantity }) => {
         await queryClient.cancelQueries(cartQueryOptions())
         const previousCart = queryClient.getQueryData<Cart>(
            cartQueryOptions().queryKey,
         )
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
            queryClient.setQueryData(cartQueryOptions().queryKey, updatedCart)
         }
         return { previousCart }
      },
      onError: (_, __, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(
               cartQueryOptions().queryKey,
               context.previousCart,
            )
         }
      },
      onSettled: () => {
         if (
            queryClient.isMutating({ mutationKey: ["update-cart-item"] }) !== 1
         )
            return

         return queryClient.invalidateQueries(cartQueryOptions())
      },
   })
}
