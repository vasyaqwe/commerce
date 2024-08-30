"use client"

import { addItem } from "@/components/cart/actions"
import { pushModal } from "@/components/modals"
import { Button } from "@/components/ui/button"
import type { Product, ProductVariant } from "@/lib/shopify/types"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { useSearchParams } from "next/navigation"
import { useFormState } from "react-dom"
import { useCart } from "./cart-context"

export function AddToCart({ product }: { product: Product }) {
   const { variants, availableForSale } = product
   const { addCartItem } = useCart()
   const searchParams = useSearchParams()
   const getInitialState = () => {
      const params: Record<string, string> = {}
      for (const [key, value] of searchParams.entries()) {
         params[key] = value
      }
      return params
   }
   const [message, formAction] = useFormState(addItem, null)
   const state = getInitialState()

   const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
         (option) => option.value === state[option.name.toLowerCase()],
      ),
   )
   const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
   const selectedVariantId = variant?.id || defaultVariantId
   const actionWithVariant = formAction.bind(null, selectedVariantId)
   const finalVariant = variants.find(
      (variant) => variant.id === selectedVariantId,
   )

   return (
      <form
         className="w-full"
         action={async () => {
            if (!finalVariant) return

            addCartItem(finalVariant, product)
            await actionWithVariant()
            pushModal("cart")
         }}
      >
         <Button
            disabled={!availableForSale || !selectedVariantId}
            className="h-12 w-full flex-1 gap-3 text-[1rem] lg:h-[3.75rem] lg:rounded-2xl lg:text-lg"
            aria-label="Add to cart"
         >
            <ShoppingBagIcon
               className="-mt-0.5 size-5 lg:size-6"
               strokeWidth={2}
            />
            Add to Cart
         </Button>
         <p
            aria-live="polite"
            className="sr-only"
            role="status"
         >
            {message}
         </p>
      </form>
   )
}
