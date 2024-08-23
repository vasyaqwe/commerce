"use client"

import { cn } from "@/lib/utils"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as React from "react"

const Checkbox = React.forwardRef<
   React.ElementRef<typeof CheckboxPrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
   <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
         "peer size-4 shrink-0 rounded-md border shadow disabled:cursor-not-allowed data-[state=checked]:border-primary data-[state=checked]:bg-brand data-[state=checked]:text-primary-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
         className,
      )}
      {...props}
   >
      <CheckboxPrimitive.Indicator
         className={cn("flex items-center justify-center text-current")}
      >
         <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M5 13l4 4L19 7"
            />
         </svg>
      </CheckboxPrimitive.Indicator>
   </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
