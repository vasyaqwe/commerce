import {
   type ComponentPropsWithoutRef,
   type Ref,
   forwardRef,
   useEffect,
   useId,
} from "react"
import { ID_PREFIX } from "./ComboboxContext"
import { useComboboxItemContext } from "./ComboboxItemContext"

export const ItemText = forwardRef(
   (
      props: ComponentPropsWithoutRef<"span">,
      forwardedRef: Ref<HTMLSpanElement>,
   ) => {
      const id = `${ID_PREFIX}-item-text-${useId()}`

      const { setTextId } = useComboboxItemContext()

      useEffect(() => {
         setTextId(id)

         return () => setTextId(undefined)
      })

      return (
         <span
            {...props}
            id={id}
            ref={forwardedRef}
         />
      )
   },
)

ItemText.displayName = "ComboboxPrimitive.ItemText"
