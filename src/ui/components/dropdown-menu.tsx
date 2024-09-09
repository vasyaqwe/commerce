"use client"

import { cn } from "@/ui/utils"
import { CheckIcon } from "@heroicons/react/24/outline"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import * as React from "react"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
   <DropdownMenuPrimitive.Trigger
      ref={ref}
      className={cn(
         "focus-visible:!ring-primary/15 !transition-none focus-visible:border focus-visible:border-primary/75 focus-visible:ring-4",
         className,
      )}
      {...props}
   >
      {children}
   </DropdownMenuPrimitive.Trigger>
))

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
      inset?: boolean
   }
>(({ className, inset, children, ...props }, ref) => (
   <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
         "flex select-none items-center rounded-sm px-2 py-1 data-[state=open]:bg-accent focus:bg-popover-highlight",
         inset && "pl-8",
         className,
      )}
      {...props}
   >
      {children}
      {/* <ChevronRight className="ml-auto h-4 w-4" /> */}
   </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
   DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
   <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
         "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-top-1 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in",
         className,
      )}
      {...props}
   />
))
DropdownMenuSubContent.displayName =
   DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
   <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
         ref={ref}
         sideOffset={sideOffset}
         className={cn(
            `!p-1 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 z-50 min-w-[8rem] overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-2xl data-[state=closed]:animate-out data-[state=open]:animate-in`,
            className,
         )}
         {...props}
      />
   </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.Item>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
      inset?: boolean
      destructive?: boolean
   }
>(({ className, destructive = false, inset, ...props }, ref) => (
   <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
         "relative flex cursor-pointer select-none items-center gap-2 rounded-[7px] px-2.5 py-1.5 text-accent-foreground outline-none data-[disabled]:pointer-events-none focus:bg-popover-highlight [&>svg]:stroke-[var(--popover-icon)] data-[disabled]:opacity-50 focus:shadow-[0px_1px_1px_1px_black]",
         inset && "pl-8",
         destructive
            ? "focus:bg-destructive/95 focus:[--popover-icon:hsl(var(--popover-foreground))]"
            : "",
         className,
      )}
      {...props}
   />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
   <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
         "relative flex select-none items-center rounded-sm py-1 pr-2 pl-8 text-accent-foreground outline-none data-[disabled]:pointer-events-none focus:bg-popover-highlight data-[state=checked]:text-foreground focus:text-foreground data-[disabled]:opacity-50",
         className,
      )}
      checked={checked}
      {...props}
   >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <DropdownMenuPrimitive.ItemIndicator>
            <CheckIcon
               strokeWidth={2}
               className="size-4 stroke-foreground"
            />
         </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
   DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
   <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
         "relative flex select-none items-center rounded-sm py-1 pr-2 pl-8 text-accent-foreground outline-none data-[disabled]:pointer-events-none focus:bg-popover-highlight focus:text-foreground data-[disabled]:opacity-50",
         className,
      )}
      {...props}
   >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
         <DropdownMenuPrimitive.ItemIndicator>
            {/* <Circle className="h-2 w-2 fill-current" /> */}
         </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
   </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.Label>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
      inset?: boolean
   }
>(({ className, inset, ...props }, ref) => (
   <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1 ", inset && "pl-8", className)}
      {...props}
   />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
   React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
   <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-popover-highlight/80", className)}
      {...props}
   />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
   return (
      <span
         className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
         {...props}
      />
   )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuCheckboxItem,
   DropdownMenuRadioItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuGroup,
   DropdownMenuPortal,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuRadioGroup,
}
