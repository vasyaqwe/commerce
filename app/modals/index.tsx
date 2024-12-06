import { CartModal } from "@/cart/components/cart-modal"
import { ModalContent } from "@/modals/dynamic"
import { createPushModal } from "@/modals/factory"
import { Drawer } from "@/ui/components/drawer"

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

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
function ExampleModal() {
   return (
      <ModalContent>
         <div className="p-4">
            Lorem ipsum dsolor sit, amet consectetur adipisicing elit. Dolores,
            asperiores.
         </div>
      </ModalContent>
   )
}
