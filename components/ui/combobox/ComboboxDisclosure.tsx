import { useMergeRefs } from "@/hooks/use-merge-refs"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { cx } from "class-variance-authority"
import { type ComponentProps, type Ref, forwardRef } from "react"
import { useComboboxContext } from "./ComboboxContext"

interface DisclosureProps extends Omit<ComponentProps<"button">, "aria-label"> {
   className?: string
   closedLabel: string
   openedLabel: string
}

export const Disclosure = forwardRef(
   (
      { className, closedLabel, openedLabel, ...props }: DisclosureProps,
      forwardedRef: Ref<HTMLButtonElement>,
   ) => {
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
            className={cx(className, "mt-[calc((44px-32px)/2)]")}
            {...downshiftDisclosureProps}
            {...props}
            aria-label={isExpanded ? openedLabel : closedLabel}
            disabled={ctx.disabled}
         >
            <ChevronDownIcon
               className={cx(
                  "shrink-0",
                  "rotate-0 transition duration-100 ease-in",
                  {
                     "rotate-180": isExpanded,
                  },
               )}
            >
               <ChevronDownIcon className="size-5" />
            </ChevronDownIcon>
         </button>
      )
   },
)

Disclosure.displayName = "Combobox.Disclosure"
