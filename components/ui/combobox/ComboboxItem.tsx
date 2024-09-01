import { useMergeRefs } from "@/hooks/use-merge-refs"
import { cva, cx } from "class-variance-authority"
import {
   type HTMLAttributes,
   type ReactNode,
   type Ref,
   forwardRef,
} from "react"
import { useComboboxContext } from "./ComboboxContext"
import {
   ComboboxItemProvider,
   useComboboxItemContext,
} from "./ComboboxItemContext"

export interface ItemProps extends HTMLAttributes<HTMLLIElement> {
   disabled?: boolean
   value: string
   children: ReactNode
   className?: string
}

export const Item = forwardRef(
   ({ children, ...props }: ItemProps, forwardedRef: Ref<HTMLLIElement>) => {
      const { value, disabled } = props

      return (
         <ComboboxItemProvider
            value={value}
            disabled={disabled}
         >
            <ItemContent
               ref={forwardedRef}
               {...props}
            >
               {children}
            </ItemContent>
         </ComboboxItemProvider>
      )
   },
)

const styles = cva("px-lg py-md text-body-1", {
   variants: {
      selected: {
         true: "font-bold",
      },
      disabled: {
         true: "cursor-not-allowed opacity-dim-3",
         false: "cursor-pointer",
      },
      highlighted: {
         true: "",
      },
      interactionType: {
         mouse: "",
         keyboard: "",
      },
   },
   compoundVariants: [
      {
         highlighted: true,
         interactionType: "mouse",
         class: "bg-surface-hovered",
      },
      {
         highlighted: true,
         interactionType: "keyboard",
         class: "u-ring",
      },
   ],
})

const ItemContent = forwardRef(
   (
      { className, disabled = false, value, children }: ItemProps,
      forwardedRef: Ref<HTMLLIElement>,
   ) => {
      const ctx = useComboboxContext()
      const itemCtx = useComboboxItemContext()

      const isVisible = !!ctx.filteredItemsMap.get(value)

      const { ref: downshiftRef, ...downshiftItemProps } = ctx.getItemProps({
         item: itemCtx.itemData,
         index: itemCtx.index,
      })

      const ref = useMergeRefs(forwardedRef, downshiftRef)

      if (!isVisible) return null

      return (
         <li
            ref={ref}
            className={cx(
               styles({
                  selected: itemCtx.isSelected,
                  disabled,
                  highlighted: ctx.highlightedItem?.value === value,
                  interactionType: ctx.lastInteractionType,
                  className,
               }),
            )}
            key={value}
            {...downshiftItemProps}
            aria-selected={itemCtx.isSelected}
            aria-labelledby={itemCtx.textId}
         >
            {children}
         </li>
      )
   },
)

Item.displayName = "Combobox.Item"
