import type { SelectSeparator } from "@/ui/components/select"
import { cn } from "@/ui/utils"
import {
   CheckIcon,
   ChevronUpDownIcon,
   MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import type {
   PopoverContentProps,
   PopoverTriggerProps,
} from "@radix-ui/react-popover"
import {
   Command,
   CommandEmpty,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
} from "cmdk"
import type React from "react"
import {
   type ComponentProps,
   createContext,
   useContext,
   useEffect,
   useState,
} from "react"
import { buttonVariants } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type ComboboxSingleProps = {
   multiple?: false
   value?: string
   onValueChange?: (value: string) => void
}

type ComboboxMultipleProps = {
   multiple: true
   value?: string[]
   onValueChange?: (value: string[]) => void
}

type ComboboxProps = {
   children: React.ReactNode
} & (ComboboxSingleProps | ComboboxMultipleProps)

type ComboboxContextType = {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
   internalValue: string | string[]
   setInternalValue: React.Dispatch<React.SetStateAction<string | string[]>>
} & (ComboboxSingleProps | ComboboxMultipleProps)

const ComboboxContext = createContext<ComboboxContextType | undefined>(
   undefined,
)

export function Combobox(props: ComboboxProps) {
   const { children, multiple, value: externalValue, onValueChange } = props
   const [isOpen, setIsOpen] = useState(false)
   const [internalValue, setInternalValue] = useState<string | string[]>(
      multiple ? [] : "",
   )

   useEffect(() => {
      if (externalValue !== undefined) {
         setInternalValue(externalValue)
      }
   }, [externalValue])

   const handleValueChange = (newValue: string | string[]) => {
      setInternalValue(newValue)
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      onValueChange?.(newValue as any)
   }

   return (
      <ComboboxContext.Provider
         value={
            {
               multiple,
               value:
                  externalValue !== undefined ? externalValue : internalValue,
               onValueChange: handleValueChange,
               isOpen,
               setIsOpen,
               internalValue,
               setInternalValue,
            } as ComboboxContextType
         }
      >
         <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
         >
            {children}
         </Popover>
      </ComboboxContext.Provider>
   )
}

export function ComboboxTrigger({
   className,
   children,
   ...props
}: PopoverTriggerProps) {
   const context = useContext(ComboboxContext)
   if (!context)
      throw new Error("ComboboxTrigger must be used within a Combobox")

   const { internalValue: value, multiple } = context

   return (
      <PopoverTrigger
         className={cn(
            buttonVariants({ variant: "outline" }),
            "justify-start pr-3 pl-1.5 data-[disabled=true]:hover:border-transparent",
            !multiple ? "pl-3.5" : "",
            className,
         )}
         {...props}
      >
         {multiple ? (
            <span
               data-active={(value as string[]).length - 1 > 0}
               className={
                  "flex size-7 items-center justify-center rounded-lg border-2 border-muted border-dashed bg-border/25 font-medium text-[0.965rem] opacity-60 transition-opacity data-[active=true]:opacity-100"
               }
            >
               {(value as string[]).length - 1}
            </span>
         ) : null}
         {children}
         <ChevronUpDownIcon
            strokeWidth={2.5}
            className="ml-auto size-5 shrink-0 opacity-50"
         />
      </PopoverTrigger>
   )
}

export function ComboboxContent({
   className,
   children,
   ...props
}: PopoverContentProps) {
   return (
      <PopoverContent
         className={cn("p-1", className)}
         {...props}
      >
         <Command>
            <CommandList>{children}</CommandList>
         </Command>
      </PopoverContent>
   )
}

export function ComboboxInput({
   className,
   ...props
}: React.ComponentProps<typeof CommandInput>) {
   return (
      <div className="relative">
         <MagnifyingGlassIcon
            className="-translate-y-1/2 absolute top-[49%] left-2 size-5 text-popover-foreground/50"
            strokeWidth={2}
         />
         <CommandInput
            className={cn(
               "h-9 w-full border-transparent bg-transparent pr-3 pl-9 placeholder:text-popover-foreground/50 focus:outline-none",
               className,
            )}
            {...props}
         />
         <ComboboxSeparator className="mt-0" />
      </div>
   )
}

export function ComboboxSeparator({
   className,
   ...props
}: ComponentProps<typeof SelectSeparator>) {
   return (
      <CommandSeparator
         className={cn(
            "-ml-1 my-1 h-px w-[calc(100%+8px)] bg-black shadow-[0px_1.5px_0px_rgb(255_255_255_/_0.1)]",
            className,
         )}
         {...props}
      />
   )
}

export function ComboboxItem({
   children,
   value: propValue,
   className,
   ...props
}: { value: string } & ComponentProps<typeof CommandItem>) {
   const context = useContext(ComboboxContext)
   if (!context) throw new Error("ComboboxItem must be used within a Combobox")

   const { multiple, internalValue, onValueChange } = context

   const isSelected = multiple
      ? (internalValue as string[]).includes(propValue)
      : internalValue === propValue

   const handleSelect = () => {
      if (multiple) {
         const newValue = isSelected
            ? (internalValue as string[]).filter((v) => v !== propValue)
            : [...(internalValue as string[]), propValue]
         onValueChange?.(newValue)
      } else {
         onValueChange?.(propValue)
      }
   }

   return (
      <CommandItem
         value={propValue}
         onSelect={handleSelect}
         className={cn(
            "relative flex cursor-pointer select-none items-center gap-2 rounded-[9px] px-2.5 py-1.5 text-accent-foreground outline-none data-[disabled=true]:pointer-events-none aria-[selected=true]:bg-popover-highlight [&>svg]:stroke-[var(--color-popover-icon)] data-[disabled=true]:opacity-50 aria-[selected=true]:shadow-[0px_2px_1px_1px_black]",
            className,
         )}
         {...props}
      >
         {children}
         <CheckIcon
            strokeWidth={3}
            className={`ml-auto size-5 ${isSelected ? "opacity-100" : "opacity-0"}`}
         />
      </CommandItem>
   )
}

export function ComboboxEmpty({
   className,
   children,
   ...props
}: ComponentProps<"div">) {
   return (
      <CommandEmpty
         className={cn("py-6 text-center text-sm", className)}
         {...props}
      >
         {children}
      </CommandEmpty>
   )
}
