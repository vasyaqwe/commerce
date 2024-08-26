import { Card } from "@/components/ui/card"
import { defaultSort, sorting } from "@/lib/constants"
import { getProducts } from "@/lib/shopify"
import { formatCurrency } from "@/lib/utils"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
   title: "Search",
   description: "Search for products in the store.",
}

export default async function SearchPage({
   searchParams,
}: {
   searchParams?: { [key: string]: string | string[] | undefined }
}) {
   const { sort, q: searchValue } = searchParams as { [key: string]: string }
   const { sortKey, reverse } =
      sorting.find((item) => item.slug === sort) || defaultSort

   const products = await getProducts({ sortKey, reverse, query: searchValue })

   return (
      <>
         {products.length === 0 && (
            <div className="mt-16 flex w-full justify-center font-medium text-lg md:mt-28">
               <div>
                  <div className="relative mb-8">
                     <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
                     <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                        <InformationCircleIcon className="size-9" />
                     </Card>
                  </div>
                  <p className="text-foreground/90">
                     We couldn't find match &quot;{searchValue}&quot;
                  </p>
               </div>
            </div>
         )}
         {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2">
               {products.map((product) => (
                  <Link
                     key={product.handle}
                     className="relative inline-block h-full w-full"
                     href={`/product/${product.handle}`}
                     prefetch={true}
                  >
                     <div
                        className="relative"
                        style={{ aspectRatio: "5/4" }}
                     >
                        <Image
                           className="rounded-2xl object-cover"
                           alt={product.title}
                           src={product.featuredImage?.url}
                           fill
                           sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                     </div>
                     <h2 className="mt-2 font-medium"> {product.title}</h2>
                     <p className="mt-2 font-bold text-lg">
                        ₴
                        {formatCurrency(
                           product.priceRange.maxVariantPrice.amount,
                        )}{" "}
                     </p>
                  </Link>
               ))}
            </div>
         ) : null}
      </>
   )
}
