"use client"

import { buttonVariants } from "@/components/ui/button"
import { ComboboxPrimitive } from "@/components/ui/combobox-primitive"
import { cn } from "@/lib/utils"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { forwardRef } from "react"

const Combobox = ComboboxPrimitive

const ComboboxPortal = ComboboxPrimitive.Portal

const ComboboxGroup = ComboboxPrimitive.Group

const ComboboxClearButton = forwardRef<
   React.ElementRef<typeof ComboboxPrimitive.ClearButton>,
   React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.ClearButton>
>(({ className, ...props }, ref) => (
   <ComboboxPrimitive.ClearButton
      ref={ref}
      className={cn(
         buttonVariants({ variant: "ghost", size: "icon" }),
         "size-[26px] shrink-0 rounded-md",
         className,
      )}
      {...props}
   >
      <XMarkIcon
         className="size-4"
         strokeWidth={2.5}
      />
   </ComboboxPrimitive.ClearButton>
))
ComboboxClearButton.displayName = ComboboxPrimitive.ClearButton.displayName

const ComboboxDisclosure = forwardRef<
   React.ElementRef<typeof ComboboxPrimitive.Disclosure>,
   React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Disclosure>
>(({ className, ...props }, ref) => (
   <ComboboxPrimitive.Disclosure
      ref={ref}
      {...props}
   />
))
ComboboxDisclosure.displayName = ComboboxPrimitive.Disclosure.displayName

const ComboboxEmpty = forwardRef<
   React.ElementRef<typeof ComboboxPrimitive.Empty>,
   React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>
>(({ className, ...props }, ref) => (
   <ComboboxPrimitive.Empty
      ref={ref}
      className={cn("mt-5 text-center text-popover-foreground", className)}
      {...props}
   />
))
ComboboxEmpty.displayName = ComboboxPrimitive.Empty.displayName

const ComboboxInput = forwardRef<
   React.ElementRef<typeof ComboboxPrimitive.Input>,
   React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>
>(({ className, ...props }, ref) => (
   <ComboboxPrimitive.Input
      ref={ref}
      className={cn(
         "placeholder:text-muted-foreground/80 focus:outline-none",
         className,
      )}
      {...props}
   />
))
ComboboxInput.displayName = ComboboxPrimitive.Input.displayName

const ComboboxItem = forwardRef<
   React.ElementRef<typeof ComboboxPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item>
>(({ className, children, ...props }, ref) => (
   <ComboboxPrimitive.Item
      ref={ref}
      className={cn(
         `relative flex cursor-pointer items-center rounded-[8px] py-2.5 pr-10 pl-3 text-background data-[focused=true]:bg-popover-highlight`,
         className,
      )}
      {...props}
   >
      <ComboboxPrimitive.ItemText>{children}</ComboboxPrimitive.ItemText>
      <span className="absolute right-3 flex size-3.5 items-center justify-center">
         <ComboboxPrimitive.ItemIndicator>
            <CheckIcon
               strokeWidth={3}
               className="size-5 stroke-background"
            />
         </ComboboxPrimitive.ItemIndicator>
      </span>
   </ComboboxPrimitive.Item>
))
ComboboxItem.displayName = ComboboxPrimitive.Item.displayName

const ComboboxLabel = ComboboxPrimitive.Label

const ComboboxSelectedItems = forwardRef<
   React.ElementRef<typeof ComboboxPrimitive.SelectedItems>,
   React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.SelectedItems>
>(({ className, ...props }) => (
   <ComboboxPrimitive.SelectedItems
      className={cn(
         "flex h-7 items-center rounded-lg border-2 border-muted border-dashed bg-border/25 px-1.5 text-[0.925rem]",
         className,
      )}
      {...props}
   />
))
ComboboxSelectedItems.displayName = ComboboxPrimitive.SelectedItems.displayName

const ComboboxTrigger = forwardRef<
   React.ElementRef<typeof ComboboxPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger>
>(({ className, ...props }, ref) => (
   <ComboboxPrimitive.Trigger
      ref={ref}
      className={cn(
         buttonVariants({ variant: "outline" }),
         "justify-start gap-1 pl-1.5 outline outline-3 outline-transparent outline-offset-2 ring-offset-[1px] hover:border-border/60 active:outline-accent/30 has-[input:focus-visible]:outline-accent/30 active:ring-1 active:ring-accent/80 has-[input:focus-visible]:ring-1 has-[input:focus-visible]:ring-accent/80 ",
         className,
      )}
      {...props}
   />
))
ComboboxTrigger.displayName = ComboboxPrimitive.Trigger.displayName

const ComboboxContent = forwardRef<
   React.ElementRef<typeof ComboboxPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Content>
>(({ className, children, ...props }, ref) => (
   <ComboboxPrimitive.Content
      ref={ref}
      className={cn("mt-1 p-1", className)}
      {...props}
   >
      {children}
   </ComboboxPrimitive.Content>
))
ComboboxContent.displayName = ComboboxPrimitive.Content.displayName

export {
   Combobox,
   ComboboxTrigger,
   ComboboxClearButton,
   ComboboxDisclosure,
   ComboboxEmpty,
   ComboboxGroup,
   ComboboxInput,
   ComboboxItem,
   ComboboxLabel,
   ComboboxPortal,
   ComboboxContent,
   ComboboxSelectedItems,
}
