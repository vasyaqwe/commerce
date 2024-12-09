import * as shopify from "@/lib/shopify/functions"
import { Prose } from "@/ui/components/prose"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, notFound } from "@tanstack/react-router"

const pageQueryOptions = ({ handle }: { handle: string }) =>
   queryOptions({
      queryKey: ["page", handle],
      queryFn: () => shopify.getPage({ data: { handle } }),
   })

export const Route = createFileRoute("/$page")({
   component: RouteComponent,
   loader: async ({ params, context }) => {
      const page = await context.queryClient.ensureQueryData(
         pageQueryOptions({ handle: params.page }),
      )
      if (!page?.id) throw notFound()

      return page
   },
   head: ({ loaderData: page }) => {
      const title = page?.seo?.title ?? page?.title ?? "Not found"
      const description = page?.seo?.description ?? page?.bodySummary
      return {
         meta: [
            {
               title,
            },
            {
               name: "description",
               content: description,
            },
            { name: "og:title", content: title },
            { name: "og:description", content: description },
            { name: "og:type", content: "article" },
         ],
      }
   },
})

function RouteComponent() {
   const params = Route.useParams()
   const pageQuery = useSuspenseQuery(pageQueryOptions({ handle: params.page }))
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
