"use client"
import { Price } from "@/components/price"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loading } from "@/components/ui/loading"
import { DEFAULT_OPTION } from "@/lib/constants"
import { createUrl } from "@/lib/utils"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { createCartAndSetCookie, redirectToCheckout } from "./actions"
import { useCart } from "./cart-context"
import CloseCart from "./close-cart"
import { DeleteItemButton } from "./delete-item-button"
import { EditItemQuantityButton } from "./edit-item-quantity-button"
import OpenCart from "./open-cart"

type MerchandiseSearchParams = {
   [key: string]: string
}

export default function CartModal() {
   const { cart, updateCartItem } = useCart()
   const [isOpen, setIsOpen] = useState(false)
   const quantityRef = useRef(cart?.totalQuantity)
   const openCart = () => setIsOpen(true)
   const closeCart = () => setIsOpen(false)

   useEffect(() => {
      if (!cart) {
         createCartAndSetCookie()
      }
   }, [cart])

   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
      if (
         cart?.totalQuantity &&
         cart?.totalQuantity !== quantityRef.current &&
         cart?.totalQuantity > 0
      ) {
         if (!isOpen) {
            setIsOpen(true)
         }
         quantityRef.current = cart?.totalQuantity
      }
   }, [isOpen, cart?.totalQuantity, quantityRef])

   return (
      <>
         <button
            aria-label="Open cart"
            onClick={openCart}
         >
            <OpenCart quantity={cart?.totalQuantity} />
         </button>
         <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
         >
            <DialogContent className="fixed top-0 right-0 bottom-0 flex h-full w-full flex-col border-neutral-200 border-l bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
               <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg">My Cart</p>
                  <button
                     aria-label="Close cart"
                     onClick={closeCart}
                  >
                     <CloseCart />
                  </button>
               </div>

               {!cart || cart.lines.length === 0 ? (
                  <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                     <ShoppingCartIcon className="h-16" />
                     <p className="mt-6 text-center font-bold text-2xl">
                        Your cart is empty.
                     </p>
                  </div>
               ) : (
                  <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                     <ul className="flex-grow overflow-auto py-4">
                        {cart.lines
                           .sort((a, b) =>
                              a.merchandise.product.title.localeCompare(
                                 b.merchandise.product.title,
                              ),
                           )
                           .map((item, i) => {
                              const merchandiseSearchParams =
                                 {} as MerchandiseSearchParams

                              // biome-ignore lint/complexity/noForEach: <explanation>
                              item.merchandise.selectedOptions.forEach(
                                 ({ name, value }) => {
                                    if (value !== DEFAULT_OPTION) {
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
                                    className="flex w-full flex-col border-neutral-300 border-b dark:border-neutral-700"
                                 >
                                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                                       <div className="-ml-1 -mt-2 absolute z-40">
                                          <DeleteItemButton
                                             item={item}
                                             optimisticUpdate={updateCartItem}
                                          />
                                       </div>
                                       <div className="flex flex-row">
                                          <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                             <Image
                                                className="h-full w-full object-cover"
                                                width={64}
                                                height={64}
                                                alt={
                                                   item.merchandise.product
                                                      .featuredImage.altText ||
                                                   item.merchandise.product
                                                      .title
                                                }
                                                src={
                                                   item.merchandise.product
                                                      .featuredImage.url
                                                }
                                             />
                                          </div>
                                          <Link
                                             href={merchandiseUrl}
                                             onClick={closeCart}
                                             className="z-30 ml-2 flex flex-row space-x-4"
                                          >
                                             <div className="flex flex-1 flex-col text-base">
                                                <span className="leading-tight">
                                                   {
                                                      item.merchandise.product
                                                         .title
                                                   }
                                                </span>
                                                {item.merchandise.title !==
                                                DEFAULT_OPTION ? (
                                                   <p className="text-neutral-500 text-sm dark:text-neutral-400">
                                                      {item.merchandise.title}
                                                   </p>
                                                ) : null}
                                             </div>
                                          </Link>
                                       </div>
                                       <div className="flex h-16 flex-col justify-between">
                                          <Price
                                             className="flex justify-end space-y-2 text-right text-sm"
                                             amount={
                                                item.cost.totalAmount.amount
                                             }
                                             currencyCode={
                                                item.cost.totalAmount
                                                   .currencyCode
                                             }
                                          />
                                          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                             <EditItemQuantityButton
                                                item={item}
                                                type="minus"
                                                optimisticUpdate={
                                                   updateCartItem
                                                }
                                             />
                                             <p className="w-6 text-center">
                                                <span className="w-full text-sm">
                                                   {item.quantity}
                                                </span>
                                             </p>
                                             <EditItemQuantityButton
                                                item={item}
                                                type="plus"
                                                optimisticUpdate={
                                                   updateCartItem
                                                }
                                             />
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                              )
                           })}
                     </ul>
                     <div className="py-4 text-neutral-500 text-sm dark:text-neutral-400">
                        <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pb-1 dark:border-neutral-700">
                           <p>Taxes</p>
                           <Price
                              className="text-right text-base text-black dark:text-white"
                              amount={cart.cost.totalTaxAmount.amount}
                              currencyCode={
                                 cart.cost.totalTaxAmount.currencyCode
                              }
                           />
                        </div>
                        <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pt-1 pb-1 dark:border-neutral-700">
                           <p>Shipping</p>
                           <p className="text-right">Calculated at checkout</p>
                        </div>
                        <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pt-1 pb-1 dark:border-neutral-700">
                           <p>Total</p>
                           <Price
                              className="text-right text-base text-black dark:text-white"
                              amount={cart.cost.totalAmount.amount}
                              currencyCode={cart.cost.totalAmount.currencyCode}
                           />
                        </div>
                     </div>
                     <form action={redirectToCheckout}>
                        <CheckoutButton />
                     </form>
                  </div>
               )}
            </DialogContent>
         </Dialog>
      </>
   )
}

function CheckoutButton() {
   const { pending } = useFormStatus()

   return (
      <button
         className="block w-full rounded-full bg-blue-600 p-3 text-center font-medium text-sm text-white opacity-90 hover:opacity-100"
         type="submit"
         disabled={pending}
      >
         {pending ? <Loading /> : "Proceed to Checkout"}
      </button>
   )
}
