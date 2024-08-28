"use client"

import { useCart } from "@/components/cart/cart-context"
import { Search } from "@/components/layout/navbar/search"
import { pushModal } from "@/components/modals"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { type ComponentProps, Suspense } from "react"

export function Header(props: ComponentProps<"header">) {
   const { cart } = useCart()

   return (
      <header
         className="container flex items-center py-4"
         {...props}
      >
         <Link
            href="/"
            prefetch={true}
            className="mb-1"
         >
            <Icons.logo />
         </Link>
         <Suspense fallback={<>loading..</>}>
            <Search />
         </Suspense>
         <div>
            <Button
               variant={"ghost"}
               size={"icon"}
               aria-label="Open cart"
               onClick={() => pushModal("cart")}
               className="size-14 flex-col overflow-visible font-semibold text-[13px]"
            >
               <ShoppingBagIcon
                  className="mb-[3px] size-6"
                  strokeWidth={2}
               />
               Cart
               {cart?.totalQuantity ? (
                  <span className="absolute top-1.5 right-1.5 grid size-[18px] place-content-center rounded-full bg-accent font-semibold text-xs shadow-sm">
                     {cart.totalQuantity}
                  </span>
               ) : null}
            </Button>
         </div>
      </header>
   )
}
