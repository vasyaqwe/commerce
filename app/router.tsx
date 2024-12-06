import { ServerFnError } from "@/error"
import { routeTree } from "@/routeTree.gen"
import { Button, buttonVariants } from "@/ui/components/button"
import { Card } from "@/ui/components/card"
import { toast } from "@/ui/components/toast"
import {
   MagnifyingGlassCircleIcon,
   XCircleIcon,
} from "@heroicons/react/24/outline"
import { QueryClient } from "@tanstack/react-query"
import {
   ErrorComponent,
   type ErrorComponentProps,
   Link,
   createRouter as createTanStackRouter,
   rootRouteId,
   useMatch,
   useRouter,
} from "@tanstack/react-router"
import { routerWithQueryClient } from "@tanstack/react-router-with-query"
import superjson from "superjson"
import { z } from "zod"

export function createRouter() {
   const queryClient = new QueryClient({
      defaultOptions: {
         dehydrate: {
            serializeData: superjson.serialize,
         },
         hydrate: {
            deserializeData: superjson.deserialize,
         },
         queries: {
            retry(failureCount) {
               // 2 max
               return failureCount < 1
            },
            // 15 min
            staleTime: 900 * 1000,
         },
         mutations: {
            onError: (error) => {
               try {
                  const parsedError: unknown = JSON.parse(error.message)

                  const errorSchema = z.object({
                     body: ServerFnError.schema,
                  })
                  const result = errorSchema.safeParse(parsedError)

                  if (!result.success || !result.data.body.message) {
                     return toast.error("An unknown error occurred")
                  }

                  if (result.data.body.message)
                     return toast.error(result.data.body.message)
               } catch (_e) {
                  return toast.error("An unknown error occurred")
               }
            },
         },
      },
   })
   return routerWithQueryClient(
      createTanStackRouter({
         routeTree,
         context: { queryClient },
         defaultPreload: "intent",
         defaultPendingMs: 150,
         defaultPendingMinMs: 200,
         defaultPreloadStaleTime: 0,
         transformer: superjson,
         defaultErrorComponent: CatchBoundary,
         defaultNotFoundComponent: NotFound,
      }),
      queryClient,
   )
}

function NotFound() {
   return (
      <div className="grid h-[80vh] place-items-center text-center">
         <div className="lg:-mt-24 -mt-16">
            <div className="relative mb-6">
               <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
               <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                  <MagnifyingGlassCircleIcon className="size-9" />
               </Card>
            </div>
            <h1 className="mb-2 font-semibold text-xl">Тут нічого немає..</h1>
            <p className="mb-5 text-lg leading-snug opacity-70">
               Ця сторінка не більше існує — <br /> можливо вона переїхала, або
               її видалили.
            </p>
            <Link
               href={"/"}
               className={buttonVariants()}
            >
               Додому
            </Link>
         </div>
      </div>
   )
}

function CatchBoundary({ error }: ErrorComponentProps) {
   const router = useRouter()
   const _isRoot = useMatch({
      strict: false,
      select: (state) => state.id === rootRouteId,
   })

   return (
      <div className="grid h-[80vh] place-items-center text-center">
         {import.meta.env.DEV && (
            <div className="absolute top-0">
               <ErrorComponent error={error} />{" "}
            </div>
         )}

         <div className="lg:-mt-24 -mt-16">
            <div className="relative mb-6">
               <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
               <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                  <XCircleIcon className="size-9 text-destructive" />
               </Card>
            </div>
            <h1 className="mb-2 font-semibold text-xl">От-такої..</h1>
            <p className="mb-5 text-lg leading-snug opacity-70">
               Сталася технічна проблема. <br /> Будь ласка, спробуйте ще раз
               пізніше.
            </p>
            <Button
               className="active:!scale-100"
               onClick={() => {
                  router.invalidate()
               }}
            >
               Перезавантажити
            </Button>
         </div>
      </div>
   )
}

declare module "@tanstack/react-router" {
   interface Register {
      router: ReturnType<typeof createRouter>
   }
}
