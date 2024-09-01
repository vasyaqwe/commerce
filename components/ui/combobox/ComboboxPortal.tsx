import { PopoverPortal as RadixPopoverPortal } from "@/components/ui/popover"
import type { ReactElement } from "react"

export const Portal: typeof RadixPopoverPortal = ({
   children,
   ...rest
}): ReactElement => (
   <RadixPopoverPortal {...rest}>{children}</RadixPopoverPortal>
)

Portal.displayName = "Combobox.Portal"
