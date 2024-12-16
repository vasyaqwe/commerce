import { pushModal } from "@/modals"
import { CartCount } from "@/routes/-components/cart-count"
import { Route as collectionsRoute } from "@/routes/collections"
import { Route as favoritesRoute } from "@/routes/favorites"
import { Route as indexRoute } from "@/routes/index"
import {
   HeartIcon,
   HomeIcon,
   ShoppingBagIcon,
} from "@heroicons/react/24/outline"
import { Link } from "@tanstack/react-router"

export function BottomMenu() {
   return (
      <nav className="fixed bottom-0 z-[5] h-[48px] w-full border-border border-t bg-background shadow md:hidden">
         <ul className="flex h-full flex-1 items-center justify-around gap-2 px-1.5">
            <li className="flex flex-1">
               <Link
                  to={indexRoute.to}
                  activeOptions={{ exact: true }}
                  className="group inline-flex h-10 flex-1 items-center justify-center rounded-md text-foreground/60 transition-colors aria-[current=page]:text-foreground"
               >
                  <HomeIcon
                     strokeWidth={1.75}
                     className="size-[26px]"
                  />
               </Link>
            </li>
            <li className="flex flex-1">
               <Link
                  to={collectionsRoute.to}
                  className="group inline-flex h-10 flex-1 items-center justify-center rounded-md text-foreground/60 transition-colors aria-[current=page]:text-foreground/95"
               >
                  <svg
                     className="size-[26px]"
                     strokeWidth={2}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     <path d="M21 6H3" />
                     <path d="M10 12H3" />
                     <path d="M10 18H3" />
                     <circle
                        cx="17"
                        cy="15"
                        r="3"
                     />
                     <path d="m21 19-1.9-1.9" />
                  </svg>
               </Link>
            </li>
            <li className="flex flex-1">
               <Link
                  to={favoritesRoute.to}
                  className="group inline-flex h-10 flex-1 items-center justify-center rounded-md text-foreground/60 transition-colors aria-[current=page]:text-foreground"
               >
                  <HeartIcon
                     className="size-[26px]"
                     strokeWidth={1.75}
                  />
               </Link>
            </li>
            <li className="flex flex-1">
               <button
                  onClick={() => pushModal("cart")}
                  className="group inline-flex h-10 flex-1 items-center justify-center rounded-md text-foreground/60 transition-colors active:text-foreground"
               >
                  <span className="relative">
                     <ShoppingBagIcon
                        className="size-[26px]"
                        strokeWidth={1.75}
                     />
                     <CartCount />
                  </span>
               </button>
            </li>
         </ul>
      </nav>
   )
}
