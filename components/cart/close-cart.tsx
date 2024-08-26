import { cn } from "@/lib/utils"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function CloseCart({ className }: { className?: string }) {
   return (
      <XMarkIcon
         className={cn(
            "h-6 transition-all ease-in-out hover:scale-110",
            className,
         )}
      />
   )
}
