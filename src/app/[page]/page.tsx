import { getPage } from "@/lib/shopify"
import { Prose } from "@/ui/prose"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
   params,
}: {
   params: { page: string }
}): Promise<Metadata> {
   const page = await getPage(params.page)

   if (!page) return notFound()

   return {
      title: page.seo?.title || page.title,
      description: page.seo?.description || page.bodySummary,
      openGraph: {
         publishedTime: page.createdAt,
         modifiedTime: page.updatedAt,
         type: "article",
      },
   }
}

export default async function Page({ params }: { params: { page: string } }) {
   const page = await getPage(params.page)

   if (!page) return notFound()

   return (
      <>
         <h1 className="mb-8 font-bold text-5xl">{page.title}</h1>
         <Prose
            className="mb-8"
            html={page.body as string}
         />
         <p className="text-sm italic">
            {`Редагували ввостаннє ${new Intl.DateTimeFormat("uk-UA", {
               year: "numeric",
               month: "long",
               day: "numeric",
            }).format(new Date(page.updatedAt))}.`}
         </p>
      </>
   )
}
