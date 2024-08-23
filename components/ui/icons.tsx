import { cn } from "@/lib/utils"

type IconProps = React.ComponentProps<"svg">

export const Icons = {
   logo: (props: IconProps) => (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 32 28"
         {...props}
         className={cn("size-10 fill-black dark:fill-white", props.className)}
      >
         <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z" />
         <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z" />
      </svg>
   ),
}
