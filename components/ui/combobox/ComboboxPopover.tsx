import { PopoverContent as RadixPopoverContent } from "@/components/ui/popover"
import { cx } from "class-variance-authority"
import { type ComponentProps, type Ref, forwardRef, useEffect } from "react"

import { useComboboxContext } from "./ComboboxContext"

export const Popover = forwardRef(
   (
      {
         children,
         //  matchTriggerWidth = true,
         sideOffset = 4,
         className,
         ...props
      }: ComponentProps<typeof RadixPopoverContent>,
      forwardedRef: Ref<HTMLDivElement>,
   ) => {
      const ctx = useComboboxContext()

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
         ctx.setHasPopover(true)

         return () => ctx.setHasPopover(false)
      }, [])

      return (
         <RadixPopoverContent
            ref={forwardedRef}
            asChild
            // matchTriggerWidth={matchTriggerWidth}
            className={cx("!z-dropdown relative", className)}
            sideOffset={sideOffset}
            onOpenAutoFocus={(e) => {
               /**
                * With a combobox pattern, the focus should remain on the trigger at all times.
                * Passing the focus to the combobox popover would break keyboard navigation.
                */
               e.preventDefault()
            }}
            {...props}
         >
            {children}
         </RadixPopoverContent>
      )
   },
)

Popover.displayName = "Combobox.Popover"
