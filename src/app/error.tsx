"use client"

import { Button } from "@/ui/components/button"
import { Card } from "@/ui/components/card"
import { XCircleIcon } from "@heroicons/react/24/outline"

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({ reset }: { reset: () => void }) {
   return (
      <div className="grid h-[80vh] place-items-center text-center">
         <div className="lg:-mt-24 -mt-16">
            <div className="relative mb-6">
               <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
               <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                  <XCircleIcon className="size-9 text-destructive" />
               </Card>
            </div>
            <h1 className="mb-2 font-semibold text-xl">От-такої..</h1>
            <p className="mb-5 text-lg leading-snug opacity-70">
               Сталася технічна проблема. <br /> Будь ласка, спробуйте ще раз
               пізніше.
            </p>
            <Button
               className="active:!scale-100"
               onClick={reset}
            >
               Перезавантажити
            </Button>
         </div>
      </div>
   )
}
