export const seo = ({
   title: baseTitle = "Commerce",
   description,
   keywords,
   image,
}: {
   title: string | undefined
   description?: string | undefined
   image?: string | undefined
   keywords?: string | undefined
}) => {
   const title =
      baseTitle !== "Commerce" ? `${baseTitle} - Commerce` : baseTitle

   const tags = [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      // { name: "twitter:creator", content: "@tannerlinsley" },
      // { name: "twitter:site", content: "@tannerlinsley" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...(image
         ? [
              { name: "twitter:image", content: image },
              { name: "twitter:card", content: "summary_large_image" },
              { property: "og:image", content: image },
           ]
         : []),
   ]

   return tags
}
