import { useRemoveCartItem } from "@/cart/hooks/use-remove-cart-item"
import { useUpdateCartItem } from "@/cart/hooks/use-update-cart-item"
import { cartByIdQuery } from "@/cart/queries"
import type { CartItem } from "@/cart/types"
import { DEFAULT_PRODUCT_TITLE } from "@/lib/shopify/constants"
import { popModal } from "@/modals"
import { Button, buttonVariants } from "@/ui/components/button"
import {
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
} from "@/ui/components/drawer"
import {
   FeedbackState,
   FeedbackStateDescription,
   FeedbackStateIcon,
} from "@/ui/components/feedback-state"
import { cn } from "@/ui/utils"
import { formatCurrency } from "@/utils/format"
import {
   MinusIcon,
   PlusIcon,
   ShoppingCartIcon,
   XMarkIcon,
} from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"

export function CartModal() {
   const { data: cart } = useQuery(cartByIdQuery())

   return (
      <DrawerContent>
         <DrawerHeader>
            <DrawerTitle className="text-left">Кошик</DrawerTitle>
         </DrawerHeader>
         {!cart || cart.lines.length === 0 ? (
            <FeedbackState>
               <FeedbackStateIcon>
                  <ShoppingCartIcon
                     className="size-12 text-foreground/50"
                     strokeWidth={2}
                  />
               </FeedbackStateIcon>
               <FeedbackStateDescription className="mb-5">
                  Тут нічого немає.
               </FeedbackStateDescription>
               <Button onClick={() => popModal("cart")}>
                  Продовжити шопінг
               </Button>
            </FeedbackState>
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
                           const merchandiseSearch = {} as {
                              [key: string]: string
                           }

                           // biome-ignore lint/complexity/noForEach: <explanation>
                           item.merchandise.selectedOptions.forEach(
                              ({ name, value }) => {
                                 if (value !== DEFAULT_PRODUCT_TITLE) {
                                    merchandiseSearch[name.toLowerCase()] =
                                       value
                                 }
                              },
                           )

                           return (
                              <li
                                 key={i}
                                 className="relative flex w-full justify-between px-4 py-5"
                              >
                                 <DeleteItemButton item={item} />
                                 <div className="mr-1 shrink-0">
                                    <img
                                       className="relative size-[4.5rem] overflow-hidden rounded-xl border border-border object-cover"
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
                                       to={"/product/$handle"}
                                       params={{
                                          handle:
                                             item.merchandise.product.handle,
                                       }}
                                       search={merchandiseSearch}
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
                        {formatCurrency(cart.cost.totalTaxAmount.amount)}
                     </p>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                     <p>Доставка</p>
                     <p className="text-right">За тарифами перевізника</p>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                     <p>До сплати</p>
                     <p className="text-right">
                        {formatCurrency(cart.cost.totalAmount.amount)}
                     </p>
                  </div>
               </section>
               <section className="mb-5 px-4">
                  <a
                     href={cart.checkoutUrl}
                     className={cn(buttonVariants({ size: "xl" }), "w-full")}
                  >
                     Оформити замовлення
                  </a>
               </section>
            </>
         )}
      </DrawerContent>
   )
}

function EditItemQuantityButton({
   item,
   type,
}: {
   item: CartItem
   type: "plus" | "minus"
}) {
   const payload = {
      merchandiseId: item.merchandise.id,
      quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
   }
   const { updateItem } = useUpdateCartItem()

   return (
      <Button
         onClick={() =>
            updateItem.mutate({
               merchandiseId: payload.merchandiseId,
               quantity: payload.quantity,
            })
         }
         size={"icon"}
         variant={"ghost"}
         aria-label={
            type === "plus" ? "Increase item quantity" : "Reduce item quantity"
         }
         className={cn(
            "size-7 shrink-0 rounded-[6px] hover:enabled:bg-background",
            {
               "ml-auto": type === "minus",
            },
         )}
      >
         {type === "plus" ? (
            <PlusIcon className="size-5" />
         ) : (
            <MinusIcon className="size-5" />
         )}
      </Button>
   )
}

function DeleteItemButton({
   item,
}: {
   item: CartItem
}) {
   const { removeItem } = useRemoveCartItem()

   return (
      <div className="absolute top-2.5 left-2.5 z-[2]">
         <button
            onClick={() => removeItem.mutate(item.merchandise.id)}
            aria-label="Remove cart item"
            className="grid size-7 cursor-pointer place-content-center rounded-full border border-foreground/10 bg-border text-foreground/70 ring-offset-background transition-all disabled:pointer-events-none active:scale-95 hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2"
         >
            <XMarkIcon
               className="size-[18px]"
               strokeWidth={2}
            />
         </button>
      </div>
   )
}
