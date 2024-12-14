import { cn } from "@/ui/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"

const buttonVariants = cva(
   `relative inline-flex items-center cursor-pointer justify-center font-medium transition-all gap-1.5 leading-none overflow-hidden active:scale-95 duration-200 whitespace-nowrap focus-visible:ring-1 ring-offset-[1px] focus-visible:ring-accent/80 focus-visible:outline-accent/30 outline outline-3 outline-transparent outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed`,
   {
      variants: {
         variant: {
            default: `bg-primary/90 shadow-xs disabled:shadow-xs hover:shadow-lg border border-transparent focus-visible:ring-accent text-primary-foreground/95 hover:bg-primary disabled:bg-border disabled:text-foreground disabled:border-foreground/[0.12] active:shadow-md hover:text-primary-foreground`,
            secondary: `bg-muted/70 font-medium text-muted-foreground disabled:bg-muted/70 hover:bg-muted data-[state=open]:bg-muted`,
            tertiary: `bg-[#3d4046] disabled:bg-[#3d4046] border border-transparent font-medium text-[#fff] hover:bg-[#4a4d55] data-[state=open]:bg-[#4a4d55]`,
            outline: `bg-background border border-transparent shadow-1 text-foreground data-[state=open]:border-border disabled:border-transparent hover:border-border`,
            destructive: `bg-destructive/90 disabled:bg-destructive/90 hover:bg-destructive text-destructive-foreground/90 disabled:text-destructive-foreground/90 hover:text-destructive-foreground`,
            ghost: "border border-transparent disabled:bg-transparent hover:bg-muted/70",
            link: "!h-auto !rounded-none !p-0 text-foreground/70 underline transition-none hover:text-foreground",
         },
         size: {
            default: "h-[42px] rounded-xl px-3",
            sm: "h-[36px] rounded-lg px-2.5 text-sm",
            lg: "h-[38px] gap-2 rounded-2xl px-4 text-[0.975rem]",
            xl: "h-[48px] gap-3 rounded-xl px-4 text-[1rem]",
            icon: "size-[42px] gap-0 rounded-xl",
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
