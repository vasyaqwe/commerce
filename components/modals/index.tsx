"use client"

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
      // "example-name": {
      //    Wrapper,
      //    Component: ComponentName,
      // },
   },
})
