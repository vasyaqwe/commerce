import { Card } from "@/components/ui/card"
import { defaultSortFilter, sortFilter } from "@/lib/constants"
import { getProducts } from "@/lib/shopify"
import { cn, formatCurrency } from "@/lib/utils"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
   title: "Search",
   description: "Search for products in the store.",
}

export default async function Page({
   searchParams,
}: {
   searchParams?: { [key: string]: string | string[] | undefined }
}) {
   const { sort, q: searchValue } = searchParams as { [key: string]: string }
   const { sortKey, reverse } =
      sortFilter.find((item) => item.slug === sort) ?? defaultSortFilter

   const products = await getProducts({
      sortKey,
      reverse,
      query: searchValue,
   })

   return (
      <>
         {products.length === 0 && (
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
         )}
         {products.length > 0 ? (
            <div className="container grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
               {products.map((product) => (
                  <Link
                     key={product.handle}
                     className={cn(
                        "relative inline-block h-full w-full overflow-hidden rounded-2xl p-0",
                     )}
                     href={`/product/${product.handle}`}
                     prefetch={true}
                  >
                     <div
                        className={cn("relative overflow-hidden rounded-2xl")}
                        style={{ aspectRatio: "5/6" }}
                     >
                        <Image
                           className="object-cover"
                           alt={product.title}
                           src={product.featuredImage?.url}
                           fill
                           sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                     </div>
                     <div className="pt-4">
                        <h2 className="font-normal"> {product.title}</h2>
                        <p className="mt-1 font-semibold text-lg">
                           ₴
                           {formatCurrency(
                              product.priceRange.maxVariantPrice.amount,
                           )}{" "}
                        </p>
                     </div>
                  </Link>
               ))}
            </div>
         ) : null}
      </>
   )
}
