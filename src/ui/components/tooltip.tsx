"use client"

import { cn } from "@/ui/utils"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as React from "react"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
   React.ElementRef<typeof TooltipPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
   <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
         "fade-in-0 zoom-in-[96%] data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[96%] data-[side=bottom]:slide-in-from-top-[3px] data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 z-50 animate-in overflow-hidden rounded-[10px] bg-popover px-3 py-2 text-popover-foreground text-sm shadow-inner data-[state=closed]:animate-out",
         className,
      )}
      {...props}
   />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

function Tooltip({
   children,
   content,
   open,
   defaultOpen,
   onOpenChange,
   delayDuration,
   ...props
}: Omit<TooltipPrimitive.TooltipContentProps, "content"> & {
   children: React.ReactNode
   content: React.ReactNode | string
   open?: boolean
   defaultOpen?: boolean
   onOpenChange?: (open: boolean) => void
   delayDuration?: number
}) {
   return (
      <TooltipPrimitive.Root
         open={open}
         defaultOpen={defaultOpen}
         onOpenChange={onOpenChange}
         delayDuration={delayDuration}
      >
         <TooltipTrigger asChild>{children}</TooltipTrigger>
         <TooltipContent
            side="top"
            align="center"
            {...props}
         >
            {content}
         </TooltipContent>
      </TooltipPrimitive.Root>
   )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
