"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

export function Gallery({
   images,
}: { images: { src: string; altText: string }[] }) {
   const [image, setImage] = useState(0)
   const imageIndex = image

   const _nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0
   const _previousImageIndex =
      imageIndex === 0 ? images.length - 1 : imageIndex - 1

   return (
      <form>
         <div className="relative aspect-square max-h-[60svh] w-full overflow-hidden rounded-2xl">
            {images[imageIndex] && (
               <Image
                  className="size-full object-cover"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  alt={images[imageIndex]?.altText as string}
                  src={images[imageIndex]?.src as string}
                  priority={true}
               />
            )}
            {/* 
            {images.length > 1 ? (
               <div className="absolute bottom-[15%] flex w-full justify-center">
                  <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                     <button
                        formAction={() => {
                           const newState = updateImage(
                              previousImageIndex.toString(),
                           )
                           updateURL(newState)
                        }}
                        aria-label="Previous product image"
                        className={buttonClassName}
                     >
                        <ArrowLeftIcon className="h-5" />
                     </button>
                     <div className="mx-1 h-6 w-px bg-neutral-500" />
                     <button
                        formAction={() => {
                           const newState = updateImage(
                              nextImageIndex.toString(),
                           )
                           updateURL(newState)
                        }}
                        aria-label="Next product image"
                        className={buttonClassName}
                     >
                        <ArrowRightIcon className="h-5" />
                     </button>
                  </div>
               </div>
            ) : null} */}
         </div>

         {images.length > 1 ? (
            <div className="no-scrollbar flex items-center gap-3 overflow-x-auto px-1 py-3">
               {images.map((image, index) => {
                  const isActive = index === imageIndex

                  return (
                     <button
                        key={image.src}
                        formAction={() => {
                           setImage(index)
                        }}
                        aria-label="Select product image"
                        className={cn(
                           "size-16 overflow-hidden rounded-xl ring ring-transparent transition-all duration-200 lg:size-24 hover:ring-accent/40",
                           isActive ? "ring-accent/40" : "",
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
      </form>
   )
}
