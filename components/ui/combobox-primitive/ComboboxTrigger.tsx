import { useFormFieldControl } from "@/components/ui/form-field"
import { PopoverAnchor } from "@/components/ui/popover"
import { useMergeRefs } from "@/hooks/use-merge-refs"
import { cn } from "@/lib/utils"
import { type ComponentPropsWithoutRef, type Ref, forwardRef } from "react"
import { useComboboxContext } from "./ComboboxContext"
import { findElement } from "./utils"

export const Trigger = forwardRef(
   (
      { className, children, ...props }: ComponentPropsWithoutRef<"div">,
      forwardedRef: Ref<HTMLDivElement>,
   ) => {
      const ctx = useComboboxContext()
      const field = useFormFieldControl()

      // Trigger compound elements
      const leadingIcon = findElement(children, "ComboboxPrimitive.LeadingIcon")
      const selectedItems = findElement(
         children,
         "ComboboxPrimitive.SelectedItems",
      )
      const input = findElement(children, "ComboboxPrimitive.Input")
      const clearButton = findElement(children, "ComboboxPrimitive.ClearButton")
      const disclosure = findElement(children, "ComboboxPrimitive.Disclosure")

      const ref = useMergeRefs(forwardedRef, ctx.triggerAreaRef)

      const disabled = field.disabled || ctx.disabled
      const readOnly = field.readOnly || ctx.readOnly

      const hasClearButton = !!clearButton && !disabled && !readOnly

      return (
         <>
            <PopoverAnchor asChild>
               <div
                  ref={ref}
                  data-disabled={disabled}
                  onMouseDown={(e) => {
                     if ((e.target as HTMLElement).tagName === "INPUT") return
                     e.preventDefault()
                  }}
                  onClick={() => {
                     if (!ctx.isOpen && !disabled && !readOnly) {
                        ctx.openMenu()
                     }
                     if (!disabled && !readOnly) {
                        if (ctx.innerInputRef.current) {
                           ctx.innerInputRef.current.focus()
                        }
                     }
                  }}
                  className={cn(
                     "flex cursor-pointer items-center gap-1 has-[input:focus]:cursor-text",
                     className,
                  )}
                  {...props}
               >
                  {leadingIcon}
                  {selectedItems}
                  {input}
                  {hasClearButton && clearButton}
                  {disclosure}
               </div>
            </PopoverAnchor>
         </>
      )
   },
)

Trigger.displayName = "ComboboxPrimitive.Trigger"
