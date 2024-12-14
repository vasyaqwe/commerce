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
      <div className="mx-auto max-w-prose pt-8 md:pt-16 ">
         <Prose
            className="mb-8 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl"
            html={page.body as string}
         />
      </div>
   )
}
