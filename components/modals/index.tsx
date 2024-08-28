"use client"

import { CartModal } from "@/components/cart/cart-modal"
import { Drawer } from "@/components/ui/drawer"
import { createPushModal } from "pushmodal"

export const {
   pushModal,
   popModal,
   popAllModals,
   replaceWithModal,
   useOnPushModal,
   onPushModal,
   ModalProvider,
} = createPushModal({
   modals: {
      cart: {
         Wrapper: (props) => (
            <Drawer
               {...props}
               direction="right"
            />
         ),
         Component: CartModal,
      },
   },
})
