"use client"

import { cn } from "@/lib/utils"
import type { CSSProperties, ComponentProps } from "react"

function isSafari() {
   const ua = window.navigator.userAgent.toLowerCase()
   return (
      /safari/.test(ua) && !/chrome/.test(ua) && !/crios/.test(ua) // crIOS is for Chrome on iOS
   )
}

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
               "--transition": `0.725s`,
               "--backdrop": `light-dark(white, black)`,
               transition: `color, grid-template-columns`,
               transitionDuration: isSafari()
                  ? `calc(var(--transition) * 0.5), 0.2s`
                  : `calc(var(--transition) * 0.5), var(--transition)`,
               transitionTimingFunction: `var(--ease)`,
               outline: `0px solid color-mix(in lch, canvas, canvasText 85%)`,
               outlineOffset: `2px`,
            } as CSSProperties
         }
         className={cn(
            `has-[input:disabled]:!bg-background after:-inset-px has-[:focus-visible]:!outline-2 relative grid cursor-pointer grid-cols-[auto,calc(var(--active)*20px)] `,
            `items-center rounded-[10px] border bg-[color-mix(in_lch,_canvas,_canvasText_calc(var(--intent)*10%))] px-3 py-[7px] text-[var(--accent)] `,
            `leading-[1.25] after:pointer-events-none after:absolute after:z-[2] has-[input:disabled]:cursor-not-allowed after:rounded-[10px]`,
            `dark:border-foreground/10 dark:has-[input:checked]:border-foreground/10 has-[input:checked]:border-primary/10 dark:bg-muted/75 dark:hover:bg-muted`,
            `has-[:checked]:text-[var(--selected)] after:opacity-[var(--active)] after:transition-opacity after:duration-[var(--transition)]`,
            `dark:has-[input:disabled]:!bg-muted/50 dark:shadow-md after:ease-[var(--ease)] has-[:checked]:[--active:1] hover:[--intent:0.3]`,
            isSafari()
               ? "after:bg-primary/15 dark:after:bg-foreground/20"
               : "after:bg-[color-mix(in_lch,_var(--selected),_#0000_80%)]",
            className,
         )}
      >
         <span className="relative flex h-full select-none items-center">
            {children}
         </span>
         <span className="relative flex h-[19px] items-center">
            <svg
               className="absolute left-[0.5ch] size-5 w-full self-end opacity-[var(--active)] transition-opacity duration-[var(--transition)] ease-[var(--ease)]"
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
