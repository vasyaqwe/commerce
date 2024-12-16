import type * as React from "react"

type IconProps = React.ComponentProps<"svg">

export const Icons = {
   logo: (props: IconProps) => (
      <svg
         viewBox="0 0 80 80"
         fill="none"
         role="img"
         xmlns="http://www.w3.org/2000/svg"
         width={24}
         height={24}
         {...props}
      >
         <mask
            id=":r1i:"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="80"
            height="80"
         >
            <rect
               width="80"
               height="80"
               rx="160"
               fill="#fff"
            />
         </mask>
         <g mask="url(#:r1i:)">
            <rect
               width="80"
               height="80"
               fill="#7f7f7f"
            />
            <path
               filter="url(#filter_:r1i:)"
               d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
               fill="#000"
               transform="translate(0 0) rotate(-64 40 40) scale(1.2)"
            />
            <path
               filter="url(#filter_:r1i:)"
               d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
               fill="#777"
               transform="translate(0 0) rotate(96 40 40) scale(1.2)"
            />
         </g>
         <defs>
            <filter
               id="filter_:r1i:"
               filterUnits="userSpaceOnUse"
               colorInterpolationFilters="sRGB"
            >
               <feFlood
                  floodOpacity="0"
                  result="BackgroundImageFix"
               />
               <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
               />
               <feGaussianBlur
                  stdDeviation="7"
                  result="effect1_foregroundBlur"
               />
            </filter>
         </defs>
      </svg>
   ),
}
