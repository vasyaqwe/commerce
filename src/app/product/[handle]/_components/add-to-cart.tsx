"use client"

import { useAddToCartMutation } from "@/cart/mutations"
import type { Product, ProductVariant } from "@/lib/shopify/types"
import { Button } from "@/ui/button"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { useSearchParams } from "next/navigation"

export function AddToCart({ product }: { product: Product }) {
   const { variants, availableForSale } = product
   const searchParams = useSearchParams()
   const getInitialState = () => {
      const params: Record<string, string> = {}
      for (const [key, value] of searchParams.entries()) {
         params[key] = value
      }
      return params
   }
   const { mutate } = useAddToCartMutation()

   const state = getInitialState()

   const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
         (option) => option.value === state[option.name.toLowerCase()],
      ),
   )
   const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
   const selectedVariantId = variant?.id || defaultVariantId
   const finalVariant = variants.find(
      (variant) => variant.id === selectedVariantId,
   )

   return (
      <form
         className="w-full"
         action={async () => {
            if (!finalVariant) return
            mutate({ variant: finalVariant, product })
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
            Додати до кошика
         </Button>
      </form>
   )
}
