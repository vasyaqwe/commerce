"use client"

import { updateItemQuantity } from "@/components/cart/actions"
import type { CartItem } from "@/lib/shopify/types"
import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useFormState } from "react-dom"

function SubmitButton({ type }: { type: "plus" | "minus" }) {
   return (
      <button
         type="submit"
         aria-label={
            type === "plus" ? "Increase item quantity" : "Reduce item quantity"
         }
         className={cn(
            "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
            {
               "ml-auto": type === "minus",
            },
         )}
      >
         {type === "plus" ? (
            <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
         ) : (
            <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
         )}
      </button>
   )
}

export function EditItemQuantityButton({
   item,
   type,
   optimisticUpdate,
}: {
   item: CartItem
   type: "plus" | "minus"
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
   optimisticUpdate: any
}) {
   const [message, formAction] = useFormState(updateItemQuantity, null)
   const payload = {
      merchandiseId: item.merchandise.id,
      quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
   }
   const actionWithVariant = formAction.bind(null, payload)

   return (
      <form
         action={async () => {
            optimisticUpdate(payload.merchandiseId, type)
            await actionWithVariant()
         }}
      >
         <SubmitButton type={type} />
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
