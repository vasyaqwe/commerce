"use client"

import { removeItem } from "@/components/cart/actions"
import type { CartItem } from "@/lib/shopify/types"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useFormState } from "react-dom"

export function DeleteItemButton({
   item,
   optimisticUpdate,
}: {
   item: CartItem
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
   optimisticUpdate: any
}) {
   const [message, formAction] = useFormState(removeItem, null)
   const merchandiseId = item.merchandise.id
   const actionWithVariant = formAction.bind(null, merchandiseId)

   return (
      <form
         action={async () => {
            optimisticUpdate(merchandiseId, "delete")
            await actionWithVariant()
         }}
         className="absolute top-2.5 left-2.5 z-[2]"
      >
         <button
            type="submit"
            aria-label="Remove cart item"
            className="grid size-7 place-content-center rounded-full border border-foreground/10 bg-border text-foreground/70 ring-offset-background transition-[transform,background-color] disabled:pointer-events-none active:scale-95 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
         >
            <XMarkIcon
               className="size-[18px]"
               strokeWidth={2}
            />
         </button>
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
