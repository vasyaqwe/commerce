import { PopoverTrigger as RadixPopoverTrigger } from "@/components/ui/popover"
import { useCombinedState } from "@/hooks/use-combined-state"
import { useMergeRefs } from "@/hooks/use-merge-refs"
import { cx } from "class-variance-authority"
import {
   type ComponentPropsWithoutRef,
   Fragment,
   type Ref,
   forwardRef,
   useEffect,
} from "react"

import { useComboboxContext } from "./ComboboxContext"

type InputPrimitiveProps = ComponentPropsWithoutRef<"input">

interface InputProps
   extends Omit<InputPrimitiveProps, "value" | "placeholder"> {
   className?: string
   placeholder?: string
   value?: string
   defaultValue?: string
   onValueChange?: (value: string) => void
}

export const Input = forwardRef(
   (
      {
         "aria-label": ariaLabel,
         className,
         placeholder,
         value,
         defaultValue,
         onValueChange,
         ...props
      }: InputProps,
      forwardedRef: Ref<HTMLInputElement>,
   ) => {
      const ctx = useComboboxContext()
      const [inputValue] = useCombinedState(value, defaultValue)

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
         if (inputValue != null) {
            ctx.setInputValue(inputValue)
         }
      }, [inputValue])

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
         if (onValueChange) {
            ctx.setOnInputValueChange(() => onValueChange)
         }

         // Sync input with combobox default value
         if (!ctx.multiple && ctx.selectedItem) {
            ctx.setInputValue(ctx.selectedItem.text)
         }
      }, [])

      const [PopoverTrigger, popoverTriggerProps] = ctx.hasPopover
         ? [RadixPopoverTrigger, { asChild: true, type: undefined }]
         : [Fragment, {}]

      const multiselectInputProps = ctx.getDropdownProps()
      const inputRef = useMergeRefs(
         forwardedRef,
         ctx.innerInputRef,
         multiselectInputProps.ref,
      )
      const downshiftInputProps = ctx.getInputProps({
         disabled: ctx.disabled || ctx.readOnly,
         ...multiselectInputProps,
         onKeyDown: (event) => {
            multiselectInputProps.onKeyDown?.(event)
            ctx.setLastInteractionType("keyboard")
            ctx.setIsTyping(true)
         },
         /**
          *
          * Important:
          * - without this, the input cursor is moved to the end after every change.
          * @see https://github.com/downshift-js/downshift/issues/1108#issuecomment-674180157
          */
         onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            ctx.setInputValue(e.target.value)
         },
         ref: inputRef,
      })

      const hasPlaceholder = ctx.multiple
         ? ctx.selectedItems.length === 0
         : ctx.selectedItem === null

      return (
         <>
            {ariaLabel && (
               <label
                  className="sr-only"
                  {...ctx.getLabelProps()}
               >
                  {ariaLabel}
               </label>
            )}
            <PopoverTrigger {...popoverTriggerProps}>
               <input
                  type="text"
                  {...(hasPlaceholder && { placeholder })}
                  className={cx(
                     "max-w-full shrink-0 grow basis-[80px]",
                     "h-10 text-ellipsis bg-surface px-sm text-body-1 outline-none",
                     "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-on-surface/dim-3",
                     "read-only:cursor-default read-only:bg-transparent read-only:text-on-surface",
                     className,
                  )}
                  {...props}
                  {...downshiftInputProps}
                  value={ctx.inputValue}
                  aria-label={ariaLabel}
                  disabled={ctx.disabled}
                  readOnly={ctx.readOnly}
               />
            </PopoverTrigger>
         </>
      )
   },
)

Input.displayName = "Combobox.Input"
