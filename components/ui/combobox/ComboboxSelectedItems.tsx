import { TrashIcon } from "@heroicons/react/24/outline"
import { cx } from "class-variance-authority"
import type { FocusEvent } from "react"
import { useComboboxContext } from "./ComboboxContext"
import type { ComboboxItem } from "./types"

const SelectedItem = ({
   item: selectedItem,
   index,
}: { item: ComboboxItem; index: number }) => {
   const ctx = useComboboxContext()

   const isCleanable = !ctx.disabled && !ctx.readOnly

   const handleFocus = (e: FocusEvent<HTMLSpanElement>) => {
      const element = e.target as HTMLSpanElement
      if (ctx.lastInteractionType === "keyboard") {
         element.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
         })
      }
   }

   const { disabled, ...selectedItemProps } = ctx.getSelectedItemProps({
      disabled: ctx.disabled || ctx.readOnly,
      selectedItem,
      index,
   })

   const Element = disabled ? "button" : "span"

   return (
      <Element
         role="presentation"
         key={`selected-item-${index}`}
         className={cx(
            "flex h-10 items-center rounded-md bg-neutral-container align-middle",
            "text-body-2 text-on-neutral-container",
            "disabled:cursor-not-allowed disabled:opacity-dim-3",
            "focus-visible:u-ring-inset outline-none",
            { "px-md": !isCleanable, "pl-md": isCleanable },
         )}
         {...selectedItemProps}
         tabIndex={-1}
         {...(disabled && { disabled: true })}
         onFocus={handleFocus}
      >
         <span
            className={cx(
               "line-clamp-1 overflow-x-hidden text-ellipsis break-all leading-normal",
               {
                  "w-max": !ctx.wrap,
               },
            )}
         >
            {selectedItem.text}
         </span>
         {ctx.disabled}
         {isCleanable && (
            <button
               type="button"
               tabIndex={-1}
               aria-hidden
               className="h-full cursor-pointer px-md"
               onClick={(e) => {
                  e.stopPropagation()

                  const updatedSelectedItems = ctx.selectedItems.filter(
                     (item) => item.value !== selectedItem.value,
                  )

                  ctx.setSelectedItems(updatedSelectedItems)

                  if (ctx.innerInputRef.current) {
                     ctx.innerInputRef.current.focus({ preventScroll: true })
                  }
               }}
            >
               <TrashIcon className="size-5" />
            </button>
         )}
      </Element>
   )
}

export const SelectedItems = () => {
   const ctx = useComboboxContext()

   return ctx.multiple && ctx.selectedItems.length ? (
      <>
         {ctx.selectedItems.map((item, index) => (
            <SelectedItem
               key={item.value}
               item={item}
               index={index}
            />
         ))}
      </>
   ) : null
}

SelectedItems.displayName = "Combobox.SelectedItems"
