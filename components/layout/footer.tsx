"use client"

import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { env } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"

export async function Footer() {
   return (
      <footer className="mt-24 bg-border/40 text-sm md:mt-44">
         <div className="container flex flex-wrap items-start justify-around gap-8 py-12">
            <Link
               aria-label="Home"
               className="flex items-center gap-2 md:mr-auto max-md:flex-1 md:pt-1"
               href="/"
            >
               <Icons.logo />
            </Link>
            <div>
               <h2 className="mb-4 font-semibold text-lg md:text-xl">
                  Контакти
               </h2>
               <a
                  href="tel:+380681233212"
                  className="font-medium text-lg md:text-xl hover:underline"
               >
                  068 123 32 12
               </a>
               <ul className="-ml-2 mt-1.5">
                  <li>
                     <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/"
                        className={cn(
                           buttonVariants({
                              variant: "ghost",
                              size: "icon",
                           }),
                           "hover:bg-background",
                        )}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        >
                           <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                           />
                           <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                           <line
                              x1="17.5"
                              x2="17.51"
                              y1="6.5"
                              y2="6.5"
                           />
                        </svg>
                     </a>
                  </li>
               </ul>
            </div>
         </div>
         <div className="bg-foreground py-6 text-background">
            <div className="container flex items-center justify-between gap-6 font-medium md:text-[1rem]">
               <p>
                  &copy; {new Date().getFullYear()} {env.SITE_NAME}
               </p>

               <ul className="flex items-center gap-2">
                  <li>
                     <Link
                        href="/terms"
                        className="hover:underline"
                     >
                        Умови використання
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   )
}
