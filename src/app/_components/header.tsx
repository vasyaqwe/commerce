"use client"

import { cartQueryOptions } from "@/cart/queries"
import { pushModal } from "@/modals"
import { Button } from "@/ui/components/button"
import { Icons } from "@/ui/components/icons"
import { Input } from "@/ui/components/input"
import { cn } from "@/ui/utils"
import bottom from "@@/public/bottom1.jpg"
import {
   ArrowRightIcon,
   MagnifyingGlassIcon,
   ShoppingBagIcon,
} from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import Form from "next/form"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { type ComponentProps, useState } from "react"

export function Header(props: ComponentProps<"header">) {
   const [open, setOpen] = useState(false)
   const { data: cart } = useQuery(cartQueryOptions())
   const menu = [
      { title: "Верх", path: `/search/${encodeURI("топи")}`, image: bottom },
      { title: "Низ", path: `/search/${encodeURI("низ")}`, image: bottom },
      {
         title: "Аксесуари",
         path: `/search/${encodeURI("аксесуари")}`,
         image: bottom,
      },
   ]

   const searchParams = useSearchParams()

   return (
      <header
         className="z-[11] h-[69px] "
         {...props}
      >
         <div className="fixed top-0 flex h-[69px] w-full items-center border-border/60 border-b bg-background shadow-sm md:py-3">
            <div className="container flex items-center">
               <div className="flex items-center gap-8 md:min-w-[300px]">
                  <Link
                     href="/"
                     prefetch={true}
                     className="mb-1 max-md:hidden"
                  >
                     <Icons.logo />
                  </Link>
                  <button
                     aria-label="Menu"
                     className="mr-2 text-foreground/70 md:hidden"
                     aria-expanded={open}
                     onClick={() => setOpen(!open)}
                  >
                     <svg
                        className="-ml-1.5 size-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           className={cn(
                              `mb-2 origin-center transition-all duration-250`,
                              open
                                 ? "-translate-x-[2.4px] translate-y-[1.6px] rotate-45"
                                 : "",
                           )}
                           d="M6 9H19"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                        <path
                           className={cn(
                              `origin-center transition-all duration-250 `,
                              open
                                 ? "-translate-x-[2.4px] -translate-y-[1.6px] -rotate-45"
                                 : "",
                           )}
                           d="M6 15H19"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </button>
                  <nav
                     data-nav
                     data-state={open ? "open" : "closed"}
                     style={{
                        clipPath: !open
                           ? "inset(0 0 100% 0)"
                           : "inset(0 0 0 0)",
                        transitionTimingFunction:
                           "cubic-bezier(0.77, 0, 0.175, 1)",
                     }}
                     className={cn(
                        "max-md:data-[state=closed]:reveal max-md:data-[state=open]:hide duration-700 max-md:fixed max-md:inset-0 max-md:top-[69px] max-md:h-[calc(100svh-69px)] max-md:overflow-y-auto max-md:bg-popover max-md:p-3 max-md:text-popover-foreground max-md:shadow-xl",
                     )}
                  >
                     <ul className="flex h-full flex-col items-center gap-2.5 sm:[&>li:nth-child(3)]:col-span-2 md:flex sm:grid sm:grid-cols-2 md:flex-row md:gap-7">
                        {menu.map((item, idx) => (
                           <li
                              key={item.title}
                              className="h-[33.3333%] w-full grow rounded-xl sm:h-full max-md:overflow-hidden"
                           >
                              <Link
                                 href={item.path}
                                 prefetch={true}
                                 onClick={() => setOpen(false)}
                                 className="relative block h-full font-medium text-foreground transition-colors md:hover:text-foreground md:text-foreground/75"
                              >
                                 <Image
                                    className={cn(
                                       "size-full rounded-xl object-cover object-top brightness-95 transition-all md:hidden hover:brightness-100",
                                       idx === 2 ? "sm:h-full" : "",
                                    )}
                                    src={item.image}
                                    alt={"image"}
                                 />
                                 <span className="z-[2] flex items-center justify-between max-md:absolute max-md:right-4 max-md:bottom-4 max-md:left-4 max-md:font-semibold max-md:text-2xl">
                                    {item.title}
                                    <span className="grid size-9 place-content-center rounded-full bg-background/80 md:hidden">
                                       <ArrowRightIcon
                                          className="size-5"
                                          strokeWidth={2}
                                       />
                                    </span>
                                 </span>
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
               <div className="max-md:-mr-1.5 ml-2 flex items-center justify-end md:min-w-[300px]">
                  <Button
                     variant={"ghost"}
                     size={"icon"}
                     aria-label="Open cart"
                     onClick={() => pushModal("cart")}
                     className="size-14 flex-col gap-1 overflow-visible font-semibold text-[13px] leading-none"
                  >
                     <ShoppingBagIcon
                        className="size-6"
                        strokeWidth={2}
                     />
                     Кошик
                     <span
                        aria-hidden={!!cart?.totalQuantity}
                        style={{
                           transitionTimingFunction: "var(--ease)",
                        }}
                        className={cn(
                           "absolute top-1.5 right-1.5 grid size-[18px] scale-0 place-content-center rounded-full bg-accent font-semibold text-xs shadow-sm transition-transform duration-1000",
                           cart?.totalQuantity ? "scale-100" : "",
                        )}
                     >
                        {cart?.totalQuantity ?? 0}
                     </span>
                  </Button>
               </div>
            </div>
         </div>
      </header>
   )
}
