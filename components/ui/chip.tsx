"use client"

import { cn } from "@/lib/utils"
import type { CSSProperties, ComponentProps } from "react"

export function Chip({
   className,
   children,
   ...props
}: { className?: string; name: string } & ComponentProps<"input">) {
   return (
      <label
         htmlFor={props.id}
         data-chip
         style={
            {
               "--transition": `0.75s`,
               "--backdrop": `light-dark(white, black)`,
               transition: `color, background-color, grid-template-columns, transform`,
               transitionDuration: `calc(var(--transition) * 0.5), 0.2s, var(--transition), 0.25s`,
               transitionTimingFunction: `var(--ease), ease, var(--ease), ease`,
               outline: `0px solid color-mix(in lch, canvas, canvasText 85%)`,
               outlineOffset: `2px`,
            } as CSSProperties
         }
         className={cn(
            `has-[input:disabled]:!bg-background has-[:focus-visible]:!outline-2 grid cursor-pointer grid-cols-[auto,calc(var(--active)*20px)] bg-[hsl(var(--primary)/calc(var(--active)-0.1))] active:scale-[97%]`,
            `items-center rounded-[12px] border px-3.5 py-[9px] text-[var(--accent)] shadow-sm `,
            `leading-[1.25] has-[input:disabled]:cursor-not-allowed`,
            `dark:border-foreground/10 dark:has-[input:checked]:border-foreground/10 has-[input:checked]:border-primary/10 dark:bg-muted/75 dark:hover:bg-muted`,
            `[&:not(:has(:checked))]:hover:bg-border/50 has-[:checked]:text-background`,
            `dark:has-[input:disabled]:!bg-muted/50 dark:shadow-md has-[:checked]:[--active:1] hover:[--intent:0.3]`,
            "",
            className,
         )}
      >
         <span className="relative z-[5] flex h-full select-none items-center">
            {children}
         </span>
         <span className="relative z-[5] flex h-[19px] items-center">
            <svg
               style={{
                  transitionTimingFunction: "var(--ease)",
                  transitionDuration: "var(--transition)",
               }}
               className="absolute left-[0.5ch] size-5 w-full self-end opacity-[var(--active)] transition-opacity"
               aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               fill="currentColor"
            >
               <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
               />
            </svg>
         </span>
         <input
            className="sr-only"
            type="radio"
            {...props}
         />
      </label>
   )
}
