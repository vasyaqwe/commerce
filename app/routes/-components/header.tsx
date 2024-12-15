import bottom from "@/assets/bottom1.jpg"
import { cartByIdQuery } from "@/cart/queries"
import { pushModal } from "@/modals"
import { Button, buttonVariants } from "@/ui/components/button"
import { Icons } from "@/ui/components/icons"
import { Input } from "@/ui/components/input"
import { cn } from "@/ui/utils"
import {
   ArrowLeftIcon,
   ArrowRightIcon,
   HeartIcon,
   MagnifyingGlassIcon,
   ShoppingBagIcon,
} from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router"
import { type ComponentProps, useState } from "react"

export function Header({
   className,
   children,
   ...props
}: ComponentProps<"header">) {
   return (
      <header
         className={cn("relative z-[11] h-[60px] md:h-[69px]", className)}
         {...props}
      >
         <div className="fixed top-0 flex h-[60px] w-full items-center border-border/60 border-b bg-background shadow-xs md:h-[69px] md:py-3">
            <div className="container flex items-center justify-between max-md:px-2">
               {children}
            </div>
         </div>
      </header>
   )
}

export function HeaderNavigation({
   className,
   ...props
}: ComponentProps<"div">) {
   const [open, setOpen] = useState(false)

   const menu = [
      { title: "Верх", path: `топи`, image: bottom },
      { title: "Низ", path: `низ`, image: bottom },
      {
         title: "Аксесуари",
         path: `аксесуари`,
         image: bottom,
      },
   ] as const

   return (
      <div
         className={cn("flex items-center gap-8 md:min-w-[300px]", className)}
         {...props}
      >
         <Link
            href="/"
            className="max-md:hidden"
         >
            <Icons.logo />
         </Link>
         <Button
            variant={"ghost"}
            size={"icon"}
            aria-label="Menu"
            className="mr-2 cursor-pointer text-foreground/80 md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
         >
            <svg
               className="size-10"
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
         </Button>
         <nav
            data-nav
            data-state={open ? "open" : "closed"}
            style={{
               clipPath: !open ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
               transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
            }}
            className={cn(
               "max-md:data-[state=closed]:reveal max-md:data-[state=open]:hide duration-700 max-md:fixed max-md:inset-0 max-md:top-[60px] max-md:h-[calc(100svh-60px)] max-md:overflow-y-auto max-md:bg-popover max-md:p-3 max-md:text-popover-foreground max-md:shadow-xl",
            )}
         >
            <ul className="flex h-full flex-col items-center gap-2.5 sm:[&>li:nth-child(3)]:col-span-2 md:flex sm:grid sm:grid-cols-2 md:flex-row md:gap-7">
               {menu.map((item, idx) => (
                  <li
                     key={item.title}
                     className="h-[33.3333%] w-full grow rounded-xl sm:h-full max-md:overflow-hidden"
                  >
                     <Link
                        to={"/search/$collection"}
                        params={{ collection: item.path }}
                        search={{ q: "", sort: "relevance" }}
                        onClick={() => setOpen(false)}
                        className="relative block h-full font-semibold text-foreground transition-colors md:hover:text-foreground md:text-foreground/75"
                     >
                        <img
                           className={cn(
                              "size-full rounded-xl object-cover object-top brightness-95 transition-all md:hidden hover:brightness-100",
                              idx === 2 ? "sm:h-full" : "",
                           )}
                           src={item.image}
                           alt={""}
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
   )
}

export function HeaderSearch({ className, ...props }: ComponentProps<"form">) {
   const navigate = useNavigate()
   const search = useSearch({ strict: false })

   return (
      <form
         className={cn("relative mx-auto w-full max-w-[340px]", className)}
         onSubmit={(e) => {
            e.preventDefault()
            const formData = Object.fromEntries(
               new FormData(e.target as HTMLFormElement),
            ) as { q: string }

            navigate({
               to: "/search",
               search: {
                  q: formData.q,
               },
            })
         }}
         {...props}
      >
         <MagnifyingGlassIcon className="-translate-y-1/2 absolute top-1/2 left-3 size-6 text-foreground/30" />
         <Input
            className="pl-11"
            type="text"
            name="q"
            placeholder="Шукати"
            autoComplete="off"
            defaultValue={search.q}
         />
      </form>
   )
}

export function HeaderBackButton({
   className,
   ...props
}: ComponentProps<typeof Button>) {
   const router = useRouter()

   return (
      <>
         <Button
            onClick={() => router.history.back()}
            variant={"ghost"}
            size="icon"
            className={cn(
               "mr-2 shrink-0 text-foreground/80 md:hidden",
               className,
            )}
            aria-label="Повернутись назад"
            {...props}
         >
            <ArrowLeftIcon
               className="size-[22px]"
               strokeWidth={2}
            />
         </Button>
         <HeaderNavigation className="max-md:hidden" />
      </>
   )
}

export function HeaderButtons({ className, ...props }: ComponentProps<"div">) {
   const { data: cart } = useQuery(cartByIdQuery())
   return (
      <div
         className={cn(
            "ml-2 flex items-center justify-end gap-1 md:min-w-[300px]",
            className,
         )}
         {...props}
      >
         <Link
            to="/favorites"
            aria-label="Збережені"
            className={cn(
               buttonVariants({
                  variant: "ghost",
                  size: "icon",
               }),
               "max-md:hidden",
            )}
         >
            <HeartIcon
               className="size-6"
               strokeWidth={2}
            />
         </Link>
         <Button
            aria-label="Кошик"
            variant={"ghost"}
            size={"icon"}
            onClick={() => pushModal("cart")}
            className="overflow-visible font-semibold"
         >
            <ShoppingBagIcon
               className="size-6 max-md:text-foreground/80"
               strokeWidth={2}
            />
            <span
               aria-hidden={!!cart?.totalQuantity}
               style={{
                  transitionTimingFunction: "var(--ease)",
               }}
               className={cn(
                  "absolute top-0.5 right-0.5 grid size-[18px] scale-0 place-content-center rounded-full bg-accent font-semibold text-xs shadow-xs transition-transform duration-1000",
                  cart?.totalQuantity ? "scale-100" : "",
               )}
            >
               {cart?.totalQuantity ?? 0}
            </span>
         </Button>
      </div>
   )
}

export function HeaderTitle({ className, ...props }: ComponentProps<"h1">) {
   return (
      <>
         <p
            className={cn(
               "line-clamp-1 break-all text-center font-semibold text-lg md:hidden",
               className,
            )}
            {...props}
         />
         <HeaderSearch className="max-md:hidden" />
      </>
   )
}
