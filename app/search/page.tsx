import { ProductsList } from "@/app/search/_components/products-list"
import { Card } from "@/components/ui/card"
import {
   colorFilter,
   defaultSortFilter,
   sizeFilter,
   sortFilter,
} from "@/lib/constants"
import { getProducts } from "@/lib/shopify"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

export const metadata = {
   title: "Search",
   description: "Search for products in the store.",
}

export default async function Page({
   searchParams,
}: {
   searchParams?: { [key: string]: string | string[] | undefined }
}) {
   const {
      sort,
      q: searchValue,
      color: colorValue,
      size: sizeValue,
   } = searchParams as { [key: string]: string }

   const { sortKey, reverse } =
      sortFilter.find((item) => item.slug === sort) ?? defaultSortFilter

   const colors = colorFilter
      .filter((item) => colorValue?.split(",").includes(item.slug))
      .map((c) => c.slug)

   const sizes = sizeFilter
      .filter((item) => sizeValue?.split(",").includes(item.slug))
      .map((c) => c.slug)

   const products = await getProducts({
      sortKey,
      reverse,
      query: searchValue,
      colors,
      sizes,
   })

   return (
      <>
         {products.length === 0 ? (
            <div className="-mt-8 flex h-full w-full items-center justify-center text-balance px-8 text-center font-medium text-lg">
               <div>
                  <div className="relative mb-8">
                     <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
                     <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                        <InformationCircleIcon className="size-9" />
                     </Card>
                  </div>
                  <p className="text-foreground/90">
                     За запитом &quot;{searchValue}&quot; не знайдено жодного
                     товару.
                  </p>
               </div>
            </div>
         ) : (
            <ProductsList products={products} />
         )}
      </>
   )
}
