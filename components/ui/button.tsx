"use client"

import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"

const buttonVariants = cva(
   `relative inline-flex items-center justify-center font-medium gap-1.5 leading-none overflow-hidden whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-75`,
   {
      variants: {
         variant: {
            default: `bg-primary text-primary-foreground`,
            secondary: `transition-none bg-muted/35 font-medium text-foreground/75 hover:bg-muted/65 data-[state=open]:bg-muted/65 dark:bg-muted/50 dark:data-[state=open]:bg-muted dark:hover:bg-muted hover:text-foreground/95 data-[state=open]:text-foreground/85 dark:shadow-md`,
            "secondary-primary": `transition-none bg-muted/25 font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary`,
            "secondary-destructive": `transition-none bg-muted/25 font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive`,
            outline: `bg-background dark:bg-muted dark:border-foreground/[0.07] dark:shadow-md border text-foreground shadow-sm`,
            destructive: `bg-destructive text-destructive-foreground`,
            ghost: "border border-transparent transition-none aria-[current=page]:bg-border/70 dark:hover:bg-border hover:bg-border/70",
            link: "!h-auto !rounded-none !p-0 text-foreground/70 underline transition-none hover:text-foreground",
         },
         size: {
            default: "h-9 rounded-[10px] px-3 md:h-8 md:rounded-lg",
            sm: "h-[32px] rounded-lg px-2.5 text-sm md:h-[30px]",
            lg: "h-[38px] gap-2 rounded-[10px] px-4 text-[0.9325rem] md:h-[34px] md:rounded-lg",
            icon: "size-9 gap-0 rounded-[9px] md:size-8 md:rounded-lg",
            "with-icon":
               "h-[51px] flex-col gap-[3px] rounded-lg px-3 py-1.5 text-[0.785rem] leading-[1.25]",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   },
)

type ButtonProps = ComponentProps<"button"> &
   VariantProps<typeof buttonVariants>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, ...props }, ref) => {
      return (
         <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
         />
      )
   },
)

export { Button, type ButtonProps, buttonVariants }
