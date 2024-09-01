import { cx } from "class-variance-authority"
import {
   type ComponentPropsWithoutRef,
   type MouseEventHandler,
   forwardRef,
} from "react"

import { TrashIcon } from "@heroicons/react/24/outline"
import { useComboboxContext } from "./ComboboxContext"

export interface ClearButtonProps extends ComponentPropsWithoutRef<"button"> {
   "aria-label": string
}

export const ClearButton = forwardRef<HTMLButtonElement, ClearButtonProps>(
   ({ className, tabIndex = -1, onClick, ...others }, ref) => {
      const ctx = useComboboxContext()

      const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
         event.stopPropagation()

         if (ctx.multiple) {
            ctx.setSelectedItems([])
         } else {
            ctx.selectItem(null)
         }

         ctx.setInputValue("")

         if (ctx.innerInputRef.current) {
            ctx.innerInputRef.current.focus()
         }

         if (onClick) {
            onClick(event)
         }
      }

      return (
         <button
            ref={ref}
            className={cx(className, "text-neutral hover:text-neutral-hovered")}
            tabIndex={tabIndex}
            onClick={handleClick}
            type="button"
            {...others}
         >
            <TrashIcon className="size-5" />
         </button>
      )
   },
)

ClearButton.displayName = "Combobox.ClearButton"
