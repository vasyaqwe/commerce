import { CheckIcon } from "@heroicons/react/24/outline"
import { cx } from "class-variance-authority"
import { type ReactNode, type Ref, forwardRef } from "react"
import { useComboboxItemContext } from "./ComboboxItemContext"

export interface ItemIndicatorProps {
   children?: ReactNode
   className?: string
   label?: string
}

export const ItemIndicator = forwardRef(
   (
      { className, children, label }: ItemIndicatorProps,
      forwardedRef: Ref<HTMLSpanElement>,
   ) => {
      const { disabled, isSelected } = useComboboxItemContext()

      const childElement = children || (
         <CheckIcon
            aria-label={label}
            className="size-5"
         />
      )

      return (
         <span
            ref={forwardedRef}
            className={cx(
               "flex size-6",
               disabled && "opacity-dim-3",
               className,
            )}
         >
            {isSelected && childElement}
         </span>
      )
   },
)

ItemIndicator.displayName = "Combobox.ItemIndicator"
