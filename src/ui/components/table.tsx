"use client"

import { cn } from "@/ui/utils"
import * as React from "react"

const Table = React.forwardRef<
   HTMLTableElement,
   React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
   <div className="relative w-full overflow-auto rounded-[calc(14px)] bg-border/35">
      <table
         ref={ref}
         className={cn(
            "w-full caption-bottom font-medium text-[1rem]",
            className,
         )}
         {...props}
      />
   </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
   HTMLTableSectionElement,
   React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
   <thead
      ref={ref}
      className={cn(
         "[&>tr]:!border-0 [&>tr]:bottom-0 [&>tr]:mt-1 max-md:hidden [&>tr]:before:border-none [&>tr]:bg-transparent",
         className,
      )}
      {...props}
   >
      {children}
   </thead>
))
TableHeader.displayName = "TableHeader"

const TableHead = React.forwardRef<
   HTMLTableCellElement,
   React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
   <th
      ref={ref}
      className={cn(
         "h-12 px-5 text-left align-middle font-medium text-muted-foreground text-sm uppercase leading-none tracking-wide [&>[role=checkbox]]:translate-y-[2px] [&:has([role=checkbox])]:pr-0 first:pl-[26px] md:text-base",
         className,
      )}
      {...props}
   />
))
TableHead.displayName = "TableHead"

const TableBody = React.forwardRef<
   HTMLTableSectionElement,
   React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
   <tbody
      ref={ref}
      className={cn(
         `isolate before:absolute before:inset-1 md:before:top-12 before:z-[-1] before:rounded-[calc(14px-2px)] before:border before:bg-background before:shadow-sm`,
         className,
      )}
      {...props}
   >
      {children}
   </tbody>
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
   HTMLTableSectionElement,
   React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
   <tfoot
      ref={ref}
      className={cn(
         "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
         className,
      )}
      {...props}
   />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
   HTMLTableRowElement,
   React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => (
   <tr
      ref={ref}
      className={cn(
         `relative transition-colors before:absolute before:inset-0 before:bottom-0 before:z-[1] before:mx-auto md:[&:first-child>td>div]:mt-1 md:[&:last-child>td>div]:mb-1 max-md:flex before:h-px before:w-[calc(100%-0.75rem)] max-md:flex-col max-md:gap-3 after:rounded-[calc(14px-4px)] before:border-t-2 before:border-dashed first:before:border-none data-[state=selected]:bg-muted max-md:px-6 max-md:py-5`,
         className,
      )}
      {...props}
   >
      {children}
   </tr>
))
TableRow.displayName = "TableRow"

const TableCell = React.forwardRef<
   HTMLTableCellElement,
   React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => (
   <td
      ref={ref}
      className={cn(
         `grid-cols-[90px_1fr] items-center align-middle max-md:grid md:before:hidden max-md:w-full [&:has([role=checkbox])]:pr-0 before:font-medium before:font-primary before:text-foreground/70 before:text-sm before:uppercase`,
      )}
      {...props}
   >
      <div className={cn("md:px-5 md:py-4", className)}>{children}</div>
   </td>
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
   HTMLTableCaptionElement,
   React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
   <caption
      ref={ref}
      className={cn("mt-4 text-foreground/70", className)}
      {...props}
   />
))
TableCaption.displayName = "TableCaption"

export {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
}
