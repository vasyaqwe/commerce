import { type ComponentPropsWithoutRef, type Ref, forwardRef } from "react"
import { useComboboxGroupContext } from "./ComboboxItemsGroupContext"

export const Label = forwardRef(
   (
      props: ComponentPropsWithoutRef<"div">,
      forwardedRef: Ref<HTMLDivElement>,
   ) => {
      const groupCtx = useComboboxGroupContext()

      return (
         <div
            {...props}
            ref={forwardedRef}
            id={groupCtx.groupLabelId}
         />
      )
   },
)

Label.displayName = "ComboboxPrimitive.Label"
