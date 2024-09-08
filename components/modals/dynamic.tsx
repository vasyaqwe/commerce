import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { MOBILE_BREAKPOINT } from "@/config"
import { createResponsiveWrapper } from "pushmodal"

export const { Content, Wrapper: ResponsiveModalWrapper } =
   createResponsiveWrapper({
      desktop: {
         Wrapper: Dialog,
         Content: DialogContent,
      },
      mobile: {
         Wrapper: Drawer,
         Content: DrawerContent,
      },
      breakpoint: MOBILE_BREAKPOINT,
   })

function ResponsiveModalContent({
   children,
   ...props
}: Parameters<typeof Content>[0] & {
   variant?: "alert" | "overlay"
}) {
   return <Content {...props}>{children}</Content>
}

export { ResponsiveModalContent }
