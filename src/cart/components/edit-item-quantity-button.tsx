"use client"

import { useUpdateCartItemMutation } from "@/cart/mutations"
import type { CartItem } from "@/cart/types"
import { Button } from "@/ui/components/button"
import { cn } from "@/ui/utils"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"

export function EditItemQuantityButton({
   item,
   type,
}: {
   item: CartItem
   type: "plus" | "minus"
}) {
   const payload = {
      merchandiseId: item.merchandise.id,
      quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
   }
   const { mutate } = useUpdateCartItemMutation()

   return (
      <form
         className="size-7"
         action={async () => {
            mutate({
               merchandiseId: payload.merchandiseId,
               quantity: payload.quantity,
            })
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
      </form>
   )
}
