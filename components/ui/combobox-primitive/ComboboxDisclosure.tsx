import { useMergeRefs } from "@/hooks/use-merge-refs"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { type ComponentProps, type Ref, forwardRef } from "react"
import { useComboboxContext } from "./ComboboxContext"

type DisclosureProps = ComponentProps<"button">

export const Disclosure = forwardRef(
   ({ ...props }: DisclosureProps, forwardedRef: Ref<HTMLButtonElement>) => {
      const ctx = useComboboxContext()

      const { ref: downshiftRef, ...downshiftDisclosureProps } =
         ctx.getToggleButtonProps({
            disabled: ctx.disabled || ctx.readOnly,
            onClick: (event) => {
               event.stopPropagation()
            },
         })
      const isExpanded = downshiftDisclosureProps["aria-expanded"]
      const ref = useMergeRefs(forwardedRef, downshiftRef)

      return (
         <button
            ref={ref}
            {...downshiftDisclosureProps}
            {...props}
            aria-label={isExpanded ? "Close popup" : "Open popup"}
            disabled={ctx.disabled}
         >
            <ChevronDownIcon
               className="size-3.5"
               strokeWidth={2.5}
            />
         </button>
      )
   },
)

Disclosure.displayName = "ComboboxPrimitive.Disclosure"
