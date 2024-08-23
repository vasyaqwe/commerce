"use client"

import { cn } from "@/lib/utils"
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

const Drawer = ({
   ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
   return <DrawerPrimitive.Root {...props} />
}
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Overlay>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Overlay
      ref={ref}
      className={cn(
         "fixed inset-0 z-50 bg-black/40 dark:bg-black/75",
         className,
      )}
      {...props}
   />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
   <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
         onPointerDownOutside={(e) => {
            // don't dismiss dialog when clicking inside the toast
            if (
               e.target instanceof Element &&
               e.target.closest("[data-sonner-toast]")
            ) {
               e.preventDefault()
            }
         }}
         ref={ref}
         className={cn(
            "group fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[88svh] flex-col rounded-t-xl border bg-background shadow-[0_-8px_10px_0px_hsl(var(--foreground)/.06)] [&[vaul-drawer-direction=right]]:right-0 [&[vaul-drawer-direction=right]]:left-auto [&[vaul-drawer-direction=right]]:h-screen [&[vaul-drawer-direction=right]]:max-h-full [&[vaul-drawer-direction=right]]:w-[556px] [&[vaul-drawer-direction=right]]:rounded-r-none [&[vaul-drawer-direction=right]]:rounded-bl-xl dark:border-transparent dark:bg-popover [&>div]:p-4 [&>form]:p-4 max-md:[&>div:not(:last-child)]:pt-0 max-md:[&>form]:pt-0 [&[vaul-drawer-direction=right]]:dark:shadow-popover-side-shadow dark:shadow-popover-shadow",
            className,
         )}
         {...props}
      >
         <div className="!p-0 mx-auto mt-3.5 min-h-1 w-[37px] rounded-full bg-foreground/80 group-[&[vaul-drawer-direction=right]]:hidden" />
         {children}
      </DrawerPrimitive.Content>
   </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <header
      className={cn(
         "grid gap-1.5 border-dashed p-4 md:border-b-2 max-md:pt-2",
         className,
      )}
      {...props}
   />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      style={{
         paddingBottom: `max(calc(env(safe-area-inset-bottom) + 0.5rem), 1rem)`,
      }}
      className={cn(
         "sticky bottom-0 mt-auto flex items-center justify-between gap-2 border-t-2 border-dashed p-4",
         className,
      )}
      {...props}
   />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Title>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Title
      ref={ref}
      className={cn(
         "font-semibold text-lg leading-none tracking-tight",
         className,
      )}
      {...props}
   />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Description>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-foreground/70 text-sm", className)}
      {...props}
   />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerPortal,
   DrawerTitle,
   DrawerTrigger,
}
