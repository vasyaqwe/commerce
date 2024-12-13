import { pageByHandle } from "@/lib/shopify/functions"
import { Prose } from "@/ui/components/prose"
import { seo } from "@/utils/seo"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, notFound } from "@tanstack/react-router"

const pageByHandleQuery = ({ handle }: { handle: string }) =>
   queryOptions({
      queryKey: ["page_by_handle", handle],
      queryFn: () => pageByHandle({ data: { handle } }),
   })

export const Route = createFileRoute("/$page")({
   component: RouteComponent,
   loader: async ({ params, context }) => {
      const page = await context.queryClient.ensureQueryData(
         pageByHandleQuery({ handle: params.page }),
      )
      if (!page?.id) throw notFound()

      return page
   },
   head: ({ loaderData: page }) => {
      const title = page?.seo?.title ?? page?.title
      const description = page?.seo?.description ?? page?.bodySummary

      return {
         meta: [
            ...seo({
               title,
               description,
            }),
         ],
      }
   },
})

function RouteComponent() {
   const params = Route.useParams()
   const pageQuery = useSuspenseQuery(
      pageByHandleQuery({ handle: params.page }),
   )
   const page = pageQuery.data
   if (!page) return null

   // <div className="mx-8 max-w-2xl pt-8 sm:mx-auto">{children}</div>
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
