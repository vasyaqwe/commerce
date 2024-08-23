import { cn } from "@/lib/utils"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"

export default function OpenCart({
   className,
   quantity,
}: {
   className?: string
   quantity?: number
}) {
   return (
      <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
         <ShoppingCartIcon
            className={cn(
               "h-4 transition-all ease-in-out hover:scale-110",
               className,
            )}
         />

         {quantity ? (
            <div className="-mr-2 -mt-2 absolute top-0 right-0 h-4 w-4 rounded bg-blue-600 font-medium text-[11px] text-white">
               {quantity}
            </div>
         ) : null}
      </div>
   )
}
