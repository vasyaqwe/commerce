"use client"

import { cn } from "@/lib/utils"
import { XMarkIcon } from "@heroicons/react/24/outline"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Overlay>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
         "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-out data-[state=open]:animate-in dark:bg-black/75",
         className,
      )}
      {...props}
   />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const dialogVariants = cva(
   `data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] rounded-xl bg-background duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in`,
   {
      variants: {
         variant: {
            default: `max-w-lg [&>div]:p-4 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%] [&>form]:p-4 dark:ring-0 dark:bg-popover dark:shadow-popover-shadow ring-8 ring-ring shadow-lg data-[state=closed]:zoom-out-[97%] data-[state=open]:zoom-in-[97%]`,
            alert: "data-[state=closed]:zoom-out-[97%] data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%] data-[state=open]:zoom-in-[97%] max-w-md shadow-lg ring-8 ring-ring dark:bg-popover [&>div]:p-4 [&>form]:p-4 dark:shadow-popover-shadow dark:ring-0",
            overlay: "bg-transparent ",
            command:
               "data-[state=closed]:!animate-none top-[20px] w-[90%] max-w-[430px] translate-y-0 animate-none bg-trasparent md:top-[75px]",
            toolbar:
               "data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2 top-auto bottom-[calc(env(safe-area-inset-bottom)+5rem)] flex w-fit translate-y-0 items-center gap-1 rounded-xl border border-muted p-[5px] shadow-md md:bottom-9 dark:border-muted dark:bg-popover ",
         },
      },
      defaultVariants: {
         variant: "default",
      },
   },
)

const DialogContent = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
      VariantProps<typeof dialogVariants>
>(({ className, children, variant, ...props }, ref) => (
   <DialogPortal>
      {variant !== "toolbar" && (
         <DialogOverlay
            className={
               variant === "overlay"
                  ? "bg-background/85 backdrop-blur-[6px]"
                  : variant === "command"
                    ? "data-[state=closed]:!animate-none bg-background/75"
                    : ""
            }
         />
      )}
      <DialogPrimitive.Content
         onPointerDownOutside={(e) => {
            // don't dismiss dialog when clicking inside the toast
            if (
               e.target instanceof Element &&
               e.target.closest("[data-sonner-toast]")
            ) {
               e.preventDefault()
            }
         }}
         onOpenAutoFocus={(e) => {
            if (variant !== "toolbar") return
            e.preventDefault()
            document.body.style.pointerEvents = "auto"
         }}
         onInteractOutside={(e) => {
            if (variant !== "toolbar") return
            e.preventDefault()
         }}
         ref={ref}
         className={cn(
            dialogVariants({
               variant,
               className,
            }),
         )}
         {...props}
      >
         {children}
         {(variant === "default" || !variant) && (
            <DialogPrimitive.Close className="absolute top-3.5 right-3.5 grid size-7 place-content-center rounded-full bg-border text-foreground/70 ring-offset-background transition-[transform,background-color] duration-100 disabled:pointer-events-none active:scale-95 hover:scale-105 dark:hover:bg-foreground/15 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
               <XMarkIcon
                  className="size-4"
                  strokeWidth={3}
               />
               <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
         )}
      </DialogPrimitive.Content>
   </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn("!pb-0 flex flex-col space-y-2.5 p-4", className)}
      {...props}
   />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      style={{
         paddingBottom: `max(calc(env(safe-area-inset-bottom) + 0.5rem), 1rem)`,
      }}
      className={cn(
         "flex flex-col-reverse border-t-2 border-dashed py-3 md:mt-0.5 sm:flex-row sm:justify-end sm:space-x-2",
         className,
      )}
      {...props}
   />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Title>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Title
      ref={ref}
      className={cn(
         "font-semibold text-[1.2rem] leading-none tracking-tight",
         className,
      )}
      {...props}
   />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Description>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Description
      ref={ref}
      className={cn("inline-block text-foreground/70", className)}
      {...props}
   />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogOverlay,
   DialogPortal,
   DialogTitle,
   DialogTrigger,
}
