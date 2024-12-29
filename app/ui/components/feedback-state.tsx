import { cn } from "@/ui/utils"

export function FeedbackState({
   children,
   className,
   ...props
}: React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "-mt-16 lg:-mt-24 flex size-full items-center justify-center text-balance px-8 text-center",
            className,
         )}
         {...props}
      >
         <div>{children}</div>
      </div>
   )
}

export function FeedbackStateIcon({
   className,
   ...props
}: React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "mx-auto mb-6 grid size-20 place-items-center rounded-full bg-border/25 shadow-1",
            className,
         )}
         {...props}
      />
   )
}

export function FeedbackStateTitle({
   className,
   ...props
}: React.ComponentProps<"h1">) {
   return (
      <h1
         className={cn("mb-2 font-semibold text-xl", className)}
         {...props}
      />
   )
}

export function FeedbackStateDescription({
   className,
   ...props
}: React.ComponentProps<"p">) {
   return (
      <p
         className={cn("text-foreground/90 text-lg leading-snug", className)}
         {...props}
      />
   )
}
