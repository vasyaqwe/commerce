import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"
import { useComboboxContext } from "./combobox-context"

export const SelectedItems = ({
   className,
   ...props
}: ComponentPropsWithoutRef<"span">) => {
   const ctx = useComboboxContext()

   return ctx.multiple && ctx.selectedItems.length ? (
      <span
         className={cn(
            "whitespace-nowrap rounded-sm border px-1.5 py-0.5",
            className,
         )}
         {...props}
      >
         {ctx.selectedItems.length} обрано
      </span>
   ) : null
}

SelectedItems.displayName = "ComboboxPrimitive.SelectedItems"
