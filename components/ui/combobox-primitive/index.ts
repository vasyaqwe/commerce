import type { FC } from "react"
import { type ComboboxProps, Combobox as Root } from "./Combobox"
import { ClearButton } from "./ComboboxClearButton"
import { Content } from "./ComboboxContent"
import { ComboboxProvider, useComboboxContext } from "./ComboboxContext"
import { Disclosure } from "./ComboboxDisclosure"
import { Empty } from "./ComboboxEmpty"
import { Group } from "./ComboboxGroup"
import { Input } from "./ComboboxInput"
import { Item } from "./ComboboxItem"
import { ItemIndicator } from "./ComboboxItemIndicator"
import { ItemText } from "./ComboboxItemText"
import { Label } from "./ComboboxLabel"
import { LeadingIcon } from "./ComboboxLeadingIcon"
import { Portal } from "./ComboboxPortal"
import { SelectedItems } from "./ComboboxSelectedItems"
import { Trigger } from "./ComboboxTrigger"

export { useComboboxContext, ComboboxProvider }

export const ComboboxPrimitive: FC<ComboboxProps> & {
   Group: typeof Group
   Item: typeof Item
   ItemText: typeof ItemText
   ItemIndicator: typeof ItemIndicator
   Label: typeof Label
   Content: typeof Content
   Trigger: typeof Trigger
   LeadingIcon: typeof LeadingIcon
   Empty: typeof Empty
   Input: typeof Input
   Disclosure: typeof Disclosure
   SelectedItems: typeof SelectedItems
   ClearButton: typeof ClearButton
   Portal: typeof Portal
} = Object.assign(Root, {
   Group,
   Item,
   ItemText,
   ItemIndicator,
   Label,
   Content,
   Trigger,
   LeadingIcon,
   Empty,
   Input,
   Disclosure,
   SelectedItems,
   ClearButton,
   Portal,
})

ComboboxPrimitive.displayName = "ComboboxPrimitive.Root"
Group.displayName = "ComboboxPrimitive.Group"
Item.displayName = "ComboboxPrimitive.Item"
ItemText.displayName = "ComboboxPrimitive.ItemText"
ItemIndicator.displayName = "ComboboxPrimitive.ItemIndicator"
Label.displayName = "ComboboxPrimitive.Label"
Content.displayName = "ComboboxPrimitive.Content"
Trigger.displayName = "ComboboxPrimitive.Trigger"
LeadingIcon.displayName = "ComboboxPrimitive.LeadingIcon"
Empty.displayName = "ComboboxPrimitive.Empty"
Input.displayName = "ComboboxPrimitive.Input"
Disclosure.displayName = "ComboboxPrimitive.Disclosure"
SelectedItems.displayName = "ComboboxPrimitive.SelectedItems"
ClearButton.displayName = "ComboboxPrimitive.ClearButton"
Portal.displayName = "ComboboxPrimitive.Portal"
