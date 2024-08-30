"use client"

import { updateItemQuantity } from "@/components/cart/actions"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/lib/shopify/types"
import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useFormState } from "react-dom"

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
         className="size-7"
         action={async () => {
            optimisticUpdate(payload.merchandiseId, type)
            await actionWithVariant()
         }}
      >
         <Button
            size={"icon"}
            variant={"ghost"}
            type="submit"
            aria-label={
               type === "plus"
                  ? "Increase item quantity"
                  : "Reduce item quantity"
            }
            className={cn(
               "size-7 shrink-0 rounded-[6px] hover:enabled:bg-background",
               {
                  "ml-auto": type === "minus",
               },
            )}
         >
            {type === "plus" ? (
               <PlusIcon className="size-5" />
            ) : (
               <MinusIcon className="size-5" />
            )}
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
