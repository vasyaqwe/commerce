"use client"

import { useCart } from "@/components/cart/cart-context"
import { pushModal } from "@/components/modals"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import type { Menu } from "@/lib/shopify/types"
import {
   MagnifyingGlassIcon,
   ShoppingBagIcon,
} from "@heroicons/react/24/outline"
import Form from "next/form"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type { ComponentProps } from "react"

export function Header(props: ComponentProps<"header">) {
   const { cart } = useCart()

   const menu = [
      { title: "Верх", path: `/search/${encodeURI("верх")}` },
      { title: "Низ", path: `/search/${encodeURI("низ")}` },
      { title: "Аксесуари", path: "/accessories" },
   ]

   const searchParams = useSearchParams()

   return (
      <header
         className="mb-12 flex items-center border-border border-b py-1.5 md:py-3"
         {...props}
      >
         <div className="container flex items-center">
            <div className="flex items-center gap-8 md:min-w-[300px]">
               <Link
                  href="/"
                  prefetch={true}
                  className="mb-1 max-md:mr-4"
               >
                  <Icons.logo />
               </Link>
               <nav className="max-md:hidden">
                  <ul className="flex items-center gap-7">
                     {menu.map((item: Menu) => (
                        <li key={item.title}>
                           <Link
                              href={item.path}
                              prefetch={true}
                              className="font-medium text-foreground/75 transition-colors hover:text-foreground"
                           >
                              {item.title}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </nav>
            </div>
            <Form
               action="/search"
               className="relative mx-auto w-full max-w-[340px]"
            >
               <MagnifyingGlassIcon className="-translate-y-1/2 absolute top-1/2 left-3 size-6 text-foreground/30" />
               <Input
                  key={searchParams?.get("q")}
                  className="pl-11"
                  type="text"
                  name="q"
                  placeholder="Шукати"
                  autoComplete="off"
                  defaultValue={searchParams?.get("q") || ""}
               />
            </Form>
            <div className="max-md:-mr-2 flex items-center justify-end md:min-w-[300px]">
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
                  Кошик
                  {cart?.totalQuantity ? (
                     <span className="absolute top-1.5 right-1.5 grid size-[18px] place-content-center rounded-full bg-accent font-semibold text-xs shadow-sm">
                        {cart.totalQuantity}
                     </span>
                  ) : null}
               </Button>
            </div>
         </div>
      </header>
   )
}
