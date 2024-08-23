"use client"

import type { Menu } from "@/lib/shopify/types"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function FooterMenuItem({ item }: { item: Menu }) {
   const pathname = usePathname()
   const [active, setActive] = useState(pathname === item.path)

   useEffect(() => {
      setActive(pathname === item.path)
   }, [pathname, item.path])

   return (
      <li>
         <Link
            href={item.path}
            className={cn(
               "block p-2 text-lg underline-offset-4 md:inline-block dark:hover:text-neutral-300 hover:text-black md:text-sm hover:underline",
               {
                  "text-black dark:text-neutral-300": active,
               },
            )}
         >
            {item.title}
         </Link>
      </li>
   )
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
   if (!menu.length) return null

   return (
      <nav>
         <ul>
            {menu.map((item: Menu) => {
               return (
                  <FooterMenuItem
                     key={item.title}
                     item={item}
                  />
               )
            })}
         </ul>
      </nav>
   )
}
