"use client"

import { addItem } from "@/components/cart/actions"
import { useProduct } from "@/components/product/product-context"
import { Button } from "@/components/ui/button"
import type { Product, ProductVariant } from "@/lib/shopify/types"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { useFormState } from "react-dom"
import { useCart } from "./cart-context"

function SubmitButton({
   availableForSale,
   selectedVariantId,
}: {
   availableForSale: boolean
   selectedVariantId: string | undefined
}) {
   if (!availableForSale) {
      return (
         <Button
            className="h-12 w-full flex-1 gap-3 text-lg lg:h-[3.75rem] lg:rounded-2xl"
            disabled
         >
            Out Of Stock
         </Button>
      )
   }

   if (!selectedVariantId) {
      return (
         <Button
            className="h-12 w-full flex-1 gap-3 text-lg lg:h-[3.75rem] lg:rounded-2xl"
            aria-label="Please select an option"
            disabled
         >
            <ShoppingBagIcon
               className="size-6"
               strokeWidth={2}
            />
            Add to cart
         </Button>
      )
   }

   return (
      <Button
         className="h-12 w-full flex-1 gap-3 text-lg lg:h-[3.75rem] lg:rounded-2xl"
         aria-label="Add to cart"
      >
         <ShoppingBagIcon
            className="size-6"
            strokeWidth={2}
         />
         Add to Cart
      </Button>
   )
}

export function AddToCart({ product }: { product: Product }) {
   const { variants, availableForSale } = product
   const { addCartItem } = useCart()
   const { state } = useProduct()
   const [message, formAction] = useFormState(addItem, null)

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

   if (!finalVariant) return null

   return (
      <form
         className="w-full"
         action={async () => {
            addCartItem(finalVariant, product)
            await actionWithVariant()
         }}
      >
         <SubmitButton
            availableForSale={availableForSale}
            selectedVariantId={selectedVariantId}
         />
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
