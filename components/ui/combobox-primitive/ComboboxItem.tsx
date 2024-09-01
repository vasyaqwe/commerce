import { useMergeRefs } from "@/hooks/use-merge-refs"
import { type HTMLAttributes, type Ref, forwardRef } from "react"
import { useComboboxContext } from "./ComboboxContext"
import {
   ComboboxItemProvider,
   useComboboxItemContext,
} from "./ComboboxItemContext"

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
   disabled?: boolean
   value: string
}

export const Item = forwardRef(
   ({ children, ...props }: ItemProps, forwardedRef: Ref<HTMLDivElement>) => {
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

const ItemContent = forwardRef(
   (
      { disabled = false, value, children, ...props }: ItemProps,
      forwardedRef: Ref<HTMLDivElement>,
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
         <div
            ref={ref}
            key={value}
            {...downshiftItemProps}
            {...props}
            data-focused={ctx.highlightedItem?.value === value}
            data-disabled={disabled}
            aria-selected={itemCtx.isSelected}
            aria-labelledby={itemCtx.textId}
         >
            {children}
         </div>
      )
   },
)

Item.displayName = "ComboboxPrimitive.Item"
