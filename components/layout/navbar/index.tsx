import type { Menu } from "@/lib/shopify/types"
import Link from "next/link"

export async function Navbar() {
   // const menu = await getMenu("next-js-frontend-header-menu")
   const menu = [
      { title: "Women", path: "/women" },
      { title: "Men", path: "/men" },
      { title: "Brands", path: "/brands" },
      { title: "Sale", path: "/sale" },
   ]

   return (
      <nav className="border-b ">
         <ul className="container flex items-center gap-10 pb-4">
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
   )
}
