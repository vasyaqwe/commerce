import CartModal from "components/cart/modal"
import { Icons } from "components/ui/icons"
import { getMenu } from "lib/shopify"
import type { Menu } from "lib/shopify/types"
import Link from "next/link"
import { Suspense } from "react"
import MobileMenu from "./mobile-menu"
import Search, { SearchSkeleton } from "./search"

const { SITE_NAME } = process.env

export async function Navbar() {
   const menu = await getMenu("next-js-frontend-header-menu")

   return (
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
         <div className="block flex-none md:hidden">
            <Suspense fallback={null}>
               <MobileMenu menu={menu} />
            </Suspense>
         </div>
         <div className="flex w-full items-center">
            <div className="flex w-full md:w-1/3">
               <Link
                  href="/"
                  prefetch={true}
                  className="mr-2 flex w-full items-center justify-center lg:mr-6 md:w-auto"
               >
                  <Icons.logo />
                  <div className="ml-2 flex-none font-medium text-sm uppercase lg:block md:hidden">
                     {SITE_NAME}
                  </div>
               </Link>
               {menu.length ? (
                  <ul className="hidden gap-6 text-sm md:flex md:items-center">
                     {menu.map((item: Menu) => (
                        <li key={item.title}>
                           <Link
                              href={item.path}
                              prefetch={true}
                              className="text-neutral-500 underline-offset-4 dark:hover:text-neutral-300 dark:text-neutral-400 hover:text-black hover:underline"
                           >
                              {item.title}
                           </Link>
                        </li>
                     ))}
                  </ul>
               ) : null}
            </div>
            <div className="hidden justify-center md:flex md:w-1/3">
               <Suspense fallback={<SearchSkeleton />}>
                  <Search />
               </Suspense>
            </div>
            <div className="flex justify-end md:w-1/3">
               <CartModal />
            </div>
         </div>
      </nav>
   )
}
