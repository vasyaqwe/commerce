"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Menu } from "@/lib/shopify/types"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function MobileMenu({ menu }: { menu: Menu[] }) {
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const [isOpen, setIsOpen] = useState(false)
   const openMobileMenu = () => setIsOpen(true)
   const closeMobileMenu = () => setIsOpen(false)

   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth > 768) {
            setIsOpen(false)
         }
      }
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
   }, [isOpen])

   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
      setIsOpen(false)
   }, [pathname, searchParams])

   return (
      <>
         <button
            onClick={openMobileMenu}
            aria-label="Open mobile menu"
            className="flex h-11 w-11 items-center justify-center rounded-md border transition-colors md:hidden"
         >
            <Bars3Icon className="h-4" />
         </button>
         <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
         >
            <DialogContent className="fixed top-0 right-0 bottom-0 left-0 flex h-full w-full flex-col pb-6">
               <div className="p-4">
                  <button
                     className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                     onClick={closeMobileMenu}
                     aria-label="Close mobile menu"
                  >
                     <XMarkIcon className="h-6" />
                  </button>

                  <div className="mb-4 w-full">
                     {/* <Suspense fallback={<SearchSkeleton />}>
                        <Search />
                     </Suspense> */}
                  </div>
                  {menu.length ? (
                     <ul className="flex w-full flex-col">
                        {menu.map((item: Menu) => (
                           <li
                              className="py-2 text-black text-xl transition-colors dark:text-white hover:text-neutral-500"
                              key={item.title}
                           >
                              <Link
                                 href={item.path}
                                 prefetch={true}
                                 onClick={closeMobileMenu}
                              >
                                 {item.title}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  ) : null}
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}
