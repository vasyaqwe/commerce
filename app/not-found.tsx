import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export const metadata = {
   title: "Not found",
   description: "This page does not exist — it may have been moved or deleted.",
}

export default function Page() {
   return (
      <div className="grid h-screen place-items-center text-center">
         <div className="-mt-36 ">
            <div className="relative mb-6">
               <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
               <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                  <MagnifyingGlassCircleIcon className="size-9" />
               </Card>
            </div>
            <h1 className="mb-2 font-semibold text-xl">Not found</h1>
            <p className="mb-5 text-lg leading-snug opacity-70">
               This page does not exist — <br /> it may have been moved or
               deleted.
            </p>
            <Link
               href={"/"}
               className={buttonVariants()}
            >
               Back home
            </Link>
         </div>
      </div>
   )
}
