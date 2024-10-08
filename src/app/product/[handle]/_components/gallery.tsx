"use client"

import { cn } from "@/ui/utils"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function Gallery({
   images,
}: { images: { src: string; altText: string }[] }) {
   const [emblaRef, emblaApi] = useEmblaCarousel()
   const [carouselActive, setCarouselActive] = useState(false)
   const [emblaRef2] = useEmblaCarousel({
      dragFree: true,
      active: carouselActive,
   })
   const [selectedIndex, setSelectedIndex] = useState(0)
   const containerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const check = () => {
         if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth
            const imagesWidth = images.length * 80 + images.length
            console.log(containerWidth, imagesWidth)
            setCarouselActive(containerWidth < imagesWidth)
         }
      }

      check()
      window.addEventListener("resize", check)

      return () => window.removeEventListener("resize", check)
   }, [images])

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
      <div className="overflow-hidden">
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
         <div
            ref={containerRef}
            className=""
         >
            {images.length > 1 ? (
               <div
                  ref={emblaRef2}
                  className="relative isolate overflow-hidden after:pointer-events-none before:pointer-events-none after:absolute before:absolute after:inset-y-0 before:inset-y-0 after:right-0 before:left-0 after:z-10 before:z-10 after:w-10 before:w-10 after:bg-gradient-to-l before:bg-gradient-to-r after:from-background before:from-background after:to-transparent before:to-transparent"
               >
                  <div className="flex items-center gap-1 px-1 py-1 lg:gap-2 lg:py-2">
                     {images.map((image, idx) => {
                        return (
                           <button
                              key={image.src}
                              onClick={() => {
                                 emblaApi?.scrollTo(idx)
                              }}
                              aria-label="Select product image"
                              className={cn(
                                 "size-20 shrink-0 overflow-hidden rounded-xl border border-transparent ring ring-[2px] ring-transparent transition-all duration-200 hover:border-accent/90 hover:ring-accent/40 lg:ring-[3px]",
                                 selectedIndex === idx
                                    ? "border-accent/90 ring-accent/40"
                                    : "",
                              )}
                           >
                              <Image
                                 draggable={false}
                                 alt={image.altText}
                                 src={image.src}
                                 width={120}
                                 height={120}
                              />
                           </button>
                        )
                     })}
                  </div>
               </div>
            ) : null}
         </div>
      </div>
   )
}
