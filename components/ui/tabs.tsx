"use client"

import { cn } from "@/lib/utils"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as React from "react"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
   React.ElementRef<typeof TabsPrimitive.List>,
   React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
   <TabsPrimitive.List
      ref={ref}
      className={cn(
         "inline-flex h-[34px] items-center justify-center rounded-[9px] bg-border/80 px-[3px] text-muted-foreground dark:bg-foreground/10 dark:text-foreground/75",
         className,
      )}
      {...props}
   />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
   React.ElementRef<typeof TabsPrimitive.Trigger>,
   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
   <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
         "inline-flex items-center justify-center whitespace-nowrap rounded-[7px] px-3 py-1 font-medium text-sm ring-offset-background transition-all disabled:pointer-events-none data-[state=active]:bg-background data-[state=active]:text-foreground hover:text-foreground disabled:opacity-50 data-[state=active]:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
         className,
      )}
      {...props}
   />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
   React.ElementRef<typeof TabsPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
   <TabsPrimitive.Content
      ref={ref}
      className={cn(
         "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
         className,
      )}
      {...props}
   />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
