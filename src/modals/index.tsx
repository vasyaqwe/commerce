"use client"

import { CartModal } from "@/cart/components/cart-modal"
import { Drawer } from "@/ui/components/drawer"
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
