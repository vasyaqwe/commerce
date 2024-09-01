import { CheckIcon } from "@heroicons/react/24/outline"
import { type ComponentPropsWithoutRef, type Ref, forwardRef } from "react"
import { useComboboxItemContext } from "./combobox-item-context"

export type ItemIndicatorProps = ComponentPropsWithoutRef<"span">

export const ItemIndicator = forwardRef(
   (
      { children, ...props }: ItemIndicatorProps,
      forwardedRef: Ref<HTMLSpanElement>,
   ) => {
      const { isSelected } = useComboboxItemContext()

      const childElement = children ?? (
         <CheckIcon
            className="size-5"
            strokeWidth={3}
         />
      )

      return (
         <span
            ref={forwardedRef}
            {...props}
         >
            {isSelected && childElement}
         </span>
      )
   },
)

ItemIndicator.displayName = "ComboboxPrimitive.ItemIndicator"
