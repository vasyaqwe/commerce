import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"

const cardVariants = cva(
   `rounded-2xl border bg-background dark:bg-popover p-6 shadow-sm has-[[data-card-header=true]]:p-0`,
)

const Card = forwardRef<HTMLDivElement, ComponentProps<"div">>(
   ({ className, ...props }, ref) => (
      <div
         ref={ref}
         className={cn(cardVariants(), className)}
         {...props}
      />
   ),
)

const CardTitle = forwardRef<HTMLHeadingElement, ComponentProps<"h2">>(
   ({ className, ...props }, ref) => (
      <h2
         ref={ref}
         className={cn("font-medium text-lg leading-none", className)}
         {...props}
      />
   ),
)

const CardDescription = forwardRef<HTMLParagraphElement, ComponentProps<"p">>(
   ({ className, ...props }, ref) => (
      <p
         ref={ref}
         className={cn("mt-3 text-foreground/70 text-sm", className)}
         {...props}
      />
   ),
)

const CardHeader = forwardRef<HTMLHeadElement, ComponentProps<"header">>(
   ({ className, ...props }, ref) => (
      <header
         ref={ref}
         data-card-header="true"
         className={cn("border-b p-4", className)}
         {...props}
      />
   ),
)

const CardContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
   ({ className, ...props }, ref) => (
      <div
         ref={ref}
         className={cn("px-4 py-6", className)}
         {...props}
      />
   ),
)

const CardFooter = forwardRef<HTMLDivElement, ComponentProps<"div">>(
   ({ className, ...props }, ref) => (
      <div
         ref={ref}
         className={cn("border-t p-4", className)}
         {...props}
      />
   ),
)

export {
   Card,
   CardTitle,
   CardDescription,
   CardHeader,
   CardContent,
   CardFooter,
   cardVariants,
}
