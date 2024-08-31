"use client"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import * as SelectPrimitive from "@radix-ui/react-select"
import * as React from "react"
import { buttonVariants } from "./button"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
   <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
         buttonVariants({ variant: "outline" }),
         `justify-between gap-2.5 [&>span]:line-clamp-1`,
         className,
      )}
      {...props}
   >
      {children}
      <SelectPrimitive.Icon asChild>
         <ChevronDownIcon
            className="mt-0.5 size-3 opacity-75"
            strokeWidth={3.5}
         />
      </SelectPrimitive.Icon>
   </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
         "flex cursor-pointer items-center justify-center py-1",
         className,
      )}
      {...props}
   />
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
         "flex cursor-pointer items-center justify-center py-1",
         className,
      )}
      {...props}
   >
      <ChevronDownIcon className="size-4" />
   </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
   SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
   <SelectPrimitive.Portal>
      <SelectPrimitive.Content
         ref={ref}
         className={cn(
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 mt-1 max-h-96 min-w-[8rem] overflow-hidden rounded-xl bg-popover text-background shadow-xl",
            className,
         )}
         position={position}
         {...props}
      >
         {/* <SelectScrollUpButton /> */}
         <SelectPrimitive.Viewport
            className={cn(
               "p-1",
               position === "popper" &&
                  "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
            )}
         >
            {children}
         </SelectPrimitive.Viewport>
         {/* <SelectScrollDownButton /> */}
      </SelectPrimitive.Content>
   </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Label>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.Label
      ref={ref}
      className={cn("py-1.5 pr-2 pl-2 text-sm", className)}
      {...props}
   />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
   <SelectPrimitive.Item
      ref={ref}
      className={cn(
         `relative flex w-full cursor-pointer select-none items-center rounded-[8px] py-2 pr-10 pl-3 outline-none data-[disabled]:pointer-events-none [&>span:first-child]:flex [&>span:first-child]:w-full [&>span:first-child]:gap-2.5 focus:bg-popover-highlight data-[disabled]:opacity-50`,
         className,
      )}
      {...props}
   >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-3 flex size-3.5 items-center justify-center">
         <SelectPrimitive.ItemIndicator>
            <CheckIcon
               strokeWidth={3}
               className="size-5 stroke-background"
            />
         </SelectPrimitive.ItemIndicator>
      </span>
   </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
   React.ElementRef<typeof SelectPrimitive.Separator>,
   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
   <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
   />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectScrollDownButton,
   SelectScrollUpButton,
   SelectSeparator,
   SelectTrigger,
   SelectValue,
}
