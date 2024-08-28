"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loading } from "@/components/ui/loading"
import { DEFAULT_OPTION } from "@/lib/constants"
import { createUrl } from "@/lib/utils"
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { createCartAndSetCookie, redirectToCheckout } from "./actions"
import { useCart } from "./cart-context"
import { DeleteItemButton } from "./delete-item-button"
import { EditItemQuantityButton } from "./edit-item-quantity-button"

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
         <Button
            variant={"ghost"}
            size={"icon"}
            aria-label="Open cart"
            onClick={openCart}
            className="size-14 flex-col overflow-visible font-semibold text-[13px]"
         >
            <ShoppingBagIcon
               className="mb-[3px] size-6"
               strokeWidth={2}
            />
            Cart
            {cart?.totalQuantity ? (
               <span className="absolute top-1.5 right-1.5 grid size-[18px] place-content-center rounded-full bg-accent font-semibold text-xs shadow-sm">
                  {cart.totalQuantity}
               </span>
            ) : null}
         </Button>
         <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
         >
            <DialogContent>
               {!cart || cart.lines.length === 0 ? (
                  <div className=" flex w-full flex-col items-center justify-center overflow-hidden">
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
                                             <div className="flex flex-1 flex-col">
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
                                          <p className="flex justify-end space-y-2 text-right text-sm">
                                             {item.cost.totalAmount.amount}
                                          </p>
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
                     <div className="py-4">
                        <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pb-1 dark:border-neutral-700">
                           <p>Taxes</p>
                           <p className="text-right">
                              {cart.cost.totalTaxAmount.amount}
                           </p>
                        </div>
                        <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pt-1 pb-1 dark:border-neutral-700">
                           <p>Shipping</p>
                           <p className="text-right">Calculated at checkout</p>
                        </div>
                        <div className="mb-3 flex items-center justify-between border-neutral-200 border-b pt-1 pb-1 dark:border-neutral-700">
                           <p>Total</p>
                           <p className="text-right">
                              {cart.cost.totalAmount.amount}
                           </p>
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
         className="block w-full rounded-full p-3 text-center font-medium text-sm opacity-90 hover:opacity-100"
         type="submit"
         disabled={pending}
      >
         {pending ? <Loading /> : "Proceed to Checkout"}
      </button>
   )
}
