import { ProductsList } from "@/app/search/_components/products-list"
import { Card } from "@/components/ui/card"
import { defaultSortFilter, sortFilter } from "@/lib/constants"
import { getCollection, getCollectionProducts } from "@/lib/shopify"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
   params,
}: {
   params: { collection: string }
}): Promise<Metadata> {
   const collection = await getCollection(decodeURI(params.collection))

   if (!collection) return notFound()

   return {
      title: collection.seo?.title || collection.title,
      description:
         collection.seo?.description ||
         collection.description ||
         `${collection.title} products`,
   }
}

export default async function Page({
   params,
   searchParams,
}: {
   params: { collection: string }
   searchParams?: { [key: string]: string | string[] | undefined }
}) {
   const { sort } = searchParams as { [key: string]: string }
   const { sortKey, reverse } =
      sortFilter.find((item) => item.slug === sort) || defaultSortFilter
   const products = await getCollectionProducts({
      collection: decodeURI(params.collection),
      sortKey,
      reverse,
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
                     Не знайдено жодного товару.
                  </p>
               </div>
            </div>
         ) : (
            <ProductsList products={products} />
         )}
      </>
   )
}
