import { PopoverPortal as RadixPopoverPortal } from "@/ui/popover"
import type { ReactElement } from "react"

export const Portal: typeof RadixPopoverPortal = ({
   children,
   ...rest
}): ReactElement => (
   <RadixPopoverPortal {...rest}>{children}</RadixPopoverPortal>
)

Portal.displayName = "ComboboxPrimitive.Portal"
