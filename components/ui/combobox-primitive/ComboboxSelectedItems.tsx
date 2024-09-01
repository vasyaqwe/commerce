import type { ComponentPropsWithoutRef } from "react"
import { useComboboxContext } from "./ComboboxContext"

export const SelectedItems = (props: ComponentPropsWithoutRef<"span">) => {
   const ctx = useComboboxContext()

   return ctx.multiple && ctx.selectedItems.length ? (
      <span {...props}>{ctx.selectedItems.length} обрано</span>
   ) : null
}

SelectedItems.displayName = "ComboboxPrimitive.SelectedItems"
