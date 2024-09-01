import type React from "react"
import { useEffect, useRef } from "react"

export const useWidthIncreaseCallback = (
   elementRef: React.RefObject<HTMLDivElement>,
   callback: () => void,
): void => {
   const prevWidthRef = useRef<number | null>(null)

   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
      const checkWidthIncrease = () => {
         const currentWidth = elementRef.current?.scrollWidth || null

         if (
            prevWidthRef.current &&
            currentWidth &&
            currentWidth > prevWidthRef.current
         ) {
            callback()
         }

         prevWidthRef.current = currentWidth
         requestAnimationFrame(checkWidthIncrease)
      }

      const interval = requestAnimationFrame(checkWidthIncrease)

      return () => cancelAnimationFrame(interval)
   }, [elementRef])
}
