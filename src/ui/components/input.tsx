import { cn } from "@/ui/utils"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { cva } from "class-variance-authority"
import {
   type ComponentProps,
   type InputHTMLAttributes,
   forwardRef,
} from "react"
import { buttonVariants } from "./button"

const inputVariants = cva(
   `block h-[42px] w-full rounded-xl transition-colors text-[0.975rem] border border-transparent focus:border-[var(--border-color)] px-3 bg-muted/40 focus:bg-muted/60 placeholder:text-foreground/40 focus:outline-none ring ring-transparent appearance-none [--ring:var(--color-primary)] [--border-color:var(--color-muted)] has-[+button[data-clearinput]:active]:border-[var(--border-color)] has-[+button[data-clearinput]:active]:ring-[var(--color-primary)]`,
)
const Input = forwardRef<
   HTMLInputElement,
   InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
   return (
      <input
         type={type}
         className={cn(inputVariants(), className)}
         ref={ref}
         {...props}
      />
   )
})

export function ClearInputButton({
   className,
   visible,
   ...props
}: ComponentProps<"button"> & {
   visible: boolean
}) {
   return (
      <button
         data-clearinput
         className={cn(
            buttonVariants({ variant: "outline" }),
            "-translate-y-1/2 !size-[22px] !rounded-md absolute top-1/2 right-[7px] bg-background/90 p-[2px] text-foreground/70 shadow-shadow transition-all ",
            !props.disabled
               ? visible
                  ? "scale-100 opacity-100"
                  : "scale-50 opacity-0"
               : "",
            className,
         )}
         {...props}
      >
         <span className="sr-only">Clear search</span>{" "}
         <XMarkIcon
            className="size-5"
            strokeWidth={2.5}
         />
      </button>
   )
}

export { Input, inputVariants }
