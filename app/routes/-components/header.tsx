import bottom from "@/assets/bottom1.jpg"
import { pushModal } from "@/modals"
import { CartCount } from "@/routes/-components/cart-count"
import { Button, buttonVariants } from "@/ui/components/button"
import { Icons } from "@/ui/components/icons"
import { Input } from "@/ui/components/input"
import { cn } from "@/ui/utils"
import {
   ArrowLeftIcon,
   HeartIcon,
   MagnifyingGlassIcon,
   ShoppingBagIcon,
} from "@heroicons/react/24/outline"
import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router"

export function Header({
   className,
   children,
   ...props
}: React.ComponentProps<"header">) {
   return (
      <header
         className={cn("relative z-[11] h-[48px] md:h-[69px]", className)}
         {...props}
      >
         <div className="fixed top-0 flex h-[48px] w-full items-center border-border/60 border-b bg-background shadow-xs md:h-[69px] md:py-3">
            <div className="container grid grid-cols-[42px_1fr_42px] items-center gap-2 md:flex max-md:px-2">
               {children}
            </div>
         </div>
      </header>
   )
}

export function HeaderNavigation({
   className,
   ...props
}: React.ComponentProps<"div">) {
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
         className={className}
         {...props}
      >
         <HeaderBackButton />
         <div
            className={cn(
               "flex items-center gap-8 max-md:hidden md:min-w-[300px] max-md:justify-center",
            )}
         >
            <Link
               to="/"
               aria-label="Додому"
               preload="render"
            >
               <Icons.logo />
            </Link>
            <nav className="max-md:hidden">
               <ul className="flex h-full items-center gap-7">
                  {menu.map((item) => (
                     <li
                        key={item.title}
                        className="h-full w-full grow rounded-xl"
                     >
                        <Link
                           suppressHydrationWarning
                           to={"/search/$collection"}
                           params={{ collection: item.path }}
                           className="relative block h-full font-semibold text-foreground/75 transition-colors aria-[current=page]:text-foreground hover:text-foreground"
                        >
                           <span className="z-[2] flex items-center justify-between">
                              {item.title}
                           </span>
                        </Link>
                     </li>
                  ))}
               </ul>
            </nav>
         </div>
      </div>
   )
}

export function HeaderSearch({
   className,
   ...props
}: React.ComponentProps<"form">) {
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
         <MagnifyingGlassIcon
            strokeWidth={1.75}
            className="-translate-y-1/2 absolute top-1/2 left-2.5 size-5 text-foreground/30 md:left-3 md:size-6"
         />
         <Input
            className="pl-9 md:pl-11"
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
}: React.ComponentProps<typeof Button>) {
   const router = useRouter()

   return (
      <Button
         onClick={() => router.history.back()}
         variant={"ghost"}
         size="icon"
         className={cn("shrink-0 text-foreground/80 md:hidden", className)}
         aria-label="Повернутись назад"
         {...props}
      >
         <ArrowLeftIcon
            className="size-[22px]"
            strokeWidth={2}
         />
      </Button>
   )
}

export function HeaderButtons({
   className,
   ...props
}: React.ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "flex items-center justify-end gap-1 max-md:hidden md:min-w-[300px]",
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
            <CartCount />
         </Button>
      </div>
   )
}

export function HeaderTitle({
   className,
   ...props
}: React.ComponentProps<"h1">) {
   return (
      <>
         <p
            className={cn(
               "mx-auto line-clamp-1 break-all text-center font-semibold text-lg md:hidden",
               className,
            )}
            {...props}
         />
         <HeaderSearch className="max-md:hidden" />
      </>
   )
}
