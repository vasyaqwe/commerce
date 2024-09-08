"use client"

import { useRemoveCartItemMutation } from "@/cart/mutations"
import { cartQueryOptions } from "@/cart/queries"
import type { CartItem } from "@/cart/types"
import { DEFAULT_PRODUCT_TITLE } from "@/lib/shopify"
import { popModal } from "@/modals"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { DrawerContent, DrawerHeader, DrawerTitle } from "@/ui/drawer"
import { Loading } from "@/ui/loading"
import { createUrl, formatCurrency } from "@/ui/utils"
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useFormStatus } from "react-dom"
import { createCartAndSetCookie, redirectToCheckout } from "../actions"
import { EditItemQuantityButton } from "./edit-item-quantity-button"

export function CartModal() {
   const { data: cart } = useQuery(cartQueryOptions())

   useEffect(() => {
      if (!cart) {
         createCartAndSetCookie()
      }
   }, [cart])

   return (
      <DrawerContent>
         <DrawerHeader>
            <DrawerTitle>Кошик</DrawerTitle>
         </DrawerHeader>
         {!cart || cart.lines.length === 0 ? (
            <div className=" -mt-16 flex h-full w-full flex-col items-center justify-center overflow-hidden">
               <div className="relative mb-6">
                  <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
                  <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                     <ShoppingCartIcon className="size-9" />
                  </Card>
               </div>
               <p className="mb-5 font-medium text-lg opacity-70">
                  Тут нічого немає.
               </p>
               <Button onClick={() => popModal("cart")}>
                  Продовжити шопінг
               </Button>
            </div>
         ) : (
            <>
               <section>
                  <ul className="flex-grow divide-y divide-border overflow-auto">
                     {cart.lines
                        .sort((a, b) =>
                           a.merchandise.product.title.localeCompare(
                              b.merchandise.product.title,
                           ),
                        )
                        .map((item, i) => {
                           const merchandiseSearchParams = {} as {
                              [key: string]: string
                           }

                           // biome-ignore lint/complexity/noForEach: <explanation>
                           item.merchandise.selectedOptions.forEach(
                              ({ name, value }) => {
                                 if (value !== DEFAULT_PRODUCT_TITLE) {
                                    merchandiseSearchParams[
                                       name.toLowerCase()
                                    ] = value
                                 }
                              },
                           )

                           const merchandiseUrl = createUrl(
                              `/product/${item.merchandise.product.handle}`,
                              new URLSearchParams(merchandiseSearchParams),
                           )

                           return (
                              <li
                                 key={i}
                                 className="relative flex w-full justify-between px-4 py-5"
                              >
                                 <DeleteItemButton item={item} />
                                 <div className="mr-1 shrink-0">
                                    <Image
                                       className="relative size-[4.5rem] overflow-hidden rounded-xl border object-cover"
                                       width={100}
                                       height={100}
                                       alt={
                                          item.merchandise.product.featuredImage
                                             .altText ||
                                          item.merchandise.product.title
                                       }
                                       src={
                                          item.merchandise.product.featuredImage
                                             .url
                                       }
                                    />
                                 </div>
                                 <div className="mr-4 ml-2 flex flex-col">
                                    <Link
                                       href={merchandiseUrl}
                                       onClick={() => popModal("cart")}
                                       className="flex flex-row space-x-4"
                                    >
                                       <h3 className="line-clamp-1 font-medium text-lg leading-none">
                                          {item.merchandise.product.title}
                                       </h3>
                                    </Link>
                                    {item.merchandise.title ===
                                    DEFAULT_PRODUCT_TITLE ? null : (
                                       <p className="mt-1 font-medium text-foreground/70 text-sm">
                                          {item.merchandise.title}
                                       </p>
                                    )}
                                    <p className="mt-auto font-semibold text-[1rem]">
                                       ₴
                                       {formatCurrency(
                                          item.cost.totalAmount.amount,
                                       )}
                                    </p>
                                 </div>
                                 <div className="ml-auto flex flex-col">
                                    <div className="flex h-[38px] items-center gap-2 rounded-[10px] border border-foreground/10 bg-border/60 px-1 font-medium text-[1rem]">
                                       <EditItemQuantityButton
                                          item={item}
                                          type="minus"
                                       />
                                       <p className="w-5 text-center">
                                          {item.quantity}
                                       </p>
                                       <EditItemQuantityButton
                                          item={item}
                                          type="plus"
                                       />
                                    </div>
                                 </div>
                              </li>
                           )
                        })}
                  </ul>
               </section>
               <section className="mt-auto divide-y divide-border py-4">
                  <div className="flex items-center justify-between px-4 py-3">
                     <p>Податки</p>
                     <p className="text-right">
                        ${formatCurrency(cart.cost.totalTaxAmount.amount)}
                     </p>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                     <p>Доставка</p>
                     <p className="text-right">За тарифами перевізника</p>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                     <p>До сплати</p>
                     <p className="text-right">
                        ₴{formatCurrency(cart.cost.totalAmount.amount)}
                     </p>
                  </div>
               </section>
               <section className="mb-5">
                  <form
                     className="px-4"
                     action={() => redirectToCheckout(cart.checkoutUrl)}
                  >
                     <CheckoutButton />
                  </form>
               </section>
            </>
         )}
      </DrawerContent>
   )
}

function DeleteItemButton({
   item,
}: {
   item: CartItem
}) {
   const merchandiseId = item.merchandise.id
   const { mutate } = useRemoveCartItemMutation()

   return (
      <div className="absolute top-2.5 left-2.5 z-[2]">
         <button
            onClick={() => {
               mutate(merchandiseId)
            }}
            aria-label="Remove cart item"
            className="grid size-7 place-content-center rounded-full border border-foreground/10 bg-border text-foreground/70 ring-offset-background transition-all disabled:pointer-events-none active:scale-95 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
         >
            <XMarkIcon
               className="size-[18px]"
               strokeWidth={2}
            />
         </button>
      </div>
   )
}

function CheckoutButton() {
   const { pending } = useFormStatus()

   return (
      <Button
         className="w-full"
         size={"xl"}
         type="submit"
         disabled={pending}
      >
         {pending ? (
            <>
               <Loading /> Оброблюємо..
            </>
         ) : (
            "Оформити замовлення"
         )}
      </Button>
   )
}
