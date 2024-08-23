import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

export function Prose({
   html,
   className,
   ...props
}: ComponentProps<"div"> & { html: string }) {
   return (
      <div
         className={cn(
            "prose mx-auto max-w-6xl text-base text-black leading-7 prose-headings:mt-8 prose-ol:mt-8 prose-ul:mt-8 prose-ol:list-decimal prose-ul:list-disc prose-ol:pl-6 prose-ul:pl-6 prose-headings:font-semibold dark:prose-a:text-white dark:prose-headings:text-white dark:prose-strong:text-white dark:text-white hover:prose-a:text-neutral-300 prose-a:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-headings:text-black prose-strong:text-black prose-headings:tracking-wide prose-a:underline",
            className,
         )}
         dangerouslySetInnerHTML={{ __html: html }}
         {...props}
      />
   )
}
