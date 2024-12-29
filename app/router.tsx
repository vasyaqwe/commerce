import { ServerFnError } from "@/error"
import { routeTree } from "@/routeTree.gen"
import {
   Header,
   HeaderButtons,
   HeaderNavigation,
   HeaderSearch,
} from "@/routes/-components/header"
import { Main } from "@/routes/-components/main"
import { Button, buttonVariants } from "@/ui/components/button"
import {
   FeedbackState,
   FeedbackStateDescription,
   FeedbackStateIcon,
   FeedbackStateTitle,
} from "@/ui/components/feedback-state"
import { toast } from "@/ui/components/toast"
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline"
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
         defaultPendingMinMs: 300,
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
      <>
         <Header>
            <HeaderNavigation />
            <HeaderSearch />
            <HeaderButtons />
         </Header>
         <Main className="grid h-[80vh] place-items-center text-center">
            <FeedbackState>
               <FeedbackStateIcon>
                  <MagnifyingGlassIcon
                     className="size-12 text-foreground/50"
                     strokeWidth={2}
                  />
               </FeedbackStateIcon>
               <FeedbackStateTitle>Тут нічого немає..</FeedbackStateTitle>
               <FeedbackStateDescription className="mb-5">
                  Не знайдено жодного товару.
               </FeedbackStateDescription>
               <Link
                  to={"/"}
                  className={buttonVariants()}
               >
                  Додому
               </Link>
            </FeedbackState>
         </Main>
      </>
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

         <FeedbackState>
            <FeedbackStateIcon>
               <XCircleIcon
                  className="size-12 text-destructive"
                  strokeWidth={2}
               />
            </FeedbackStateIcon>
            <FeedbackStateTitle>От-такої..</FeedbackStateTitle>
            <FeedbackStateDescription className="mb-5">
               Сталася технічна проблема. <br /> Будь ласка, спробуйте ще раз
               пізніше.
            </FeedbackStateDescription>
            <Button
               onClick={() => {
                  router.invalidate()
               }}
            >
               Перезавантажити
            </Button>
         </FeedbackState>
      </div>
   )
}

declare module "@tanstack/react-router" {
   interface Register {
      router: ReturnType<typeof createRouter>
   }
}
