export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <div className="w-full">
            <div className="mx-8 max-w-2xl pt-8 sm:mx-auto">{children}</div>
         </div>
      </>
   )
}
