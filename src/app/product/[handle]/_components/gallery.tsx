"use client"

import { cn } from "@/ui/utils"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Gallery({
   images,
}: { images: { src: string; altText: string }[] }) {
   const [emblaRef, emblaApi] = useEmblaCarousel()
   const [selectedIndex, setSelectedIndex] = useState(0)

   useEffect(() => {
      if (emblaApi) {
         const handleSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
         }
         emblaApi.on("select", handleSelect)
         return () => {
            emblaApi.off("select", handleSelect)
         }
      }
   }, [emblaApi])

   return (
      <div>
         <div
            className="relative aspect-square max-h-[60svh] w-full overflow-hidden rounded-2xl max-lg:rounded-t-none"
            ref={emblaRef}
         >
            <div className="flex h-full">
               {images.map((image, idx) => (
                  <div
                     key={image.src}
                     className="relative size-full flex-[0_0_100%] active:cursor-grabbing"
                  >
                     <Image
                        className="size-full object-cover object-top"
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        alt={image.altText as string}
                        src={image.src as string}
                        priority={idx === 0}
                     />
                  </div>
               ))}
            </div>
         </div>
         {images.length > 1 ? (
            <div className="no-scrollbar flex items-center gap-1 overflow-x-auto px-1 py-1 lg:gap-2 lg:py-2">
               {images.map((image, idx) => {
                  return (
                     <button
                        key={image.src}
                        onClick={() => {
                           emblaApi?.scrollTo(idx)
                        }}
                        aria-label="Select product image"
                        className={cn(
                           "size-16 overflow-hidden rounded-xl ring ring-[2px] ring-transparent transition-all duration-200 lg:size-20 hover:ring-accent/40 lg:ring-[3px]",
                           selectedIndex === idx ? "ring-accent/50" : "",
                        )}
                     >
                        <Image
                           alt={image.altText}
                           src={image.src}
                           width={120}
                           height={120}
                        />
                     </button>
                  )
               })}
            </div>
         ) : null}
      </div>
   )
}
