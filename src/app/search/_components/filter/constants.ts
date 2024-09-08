export const defaultSortFilter = {
   title: "Релевантне",
   slug: "relevance",
   sortKey: "RELEVANCE",
   reverse: false,
} as const

export const sortFilter = [
   defaultSortFilter,
   {
      title: "Популярне",
      slug: "trending-desc",
      sortKey: "BEST_SELLING",
      reverse: false,
   }, // asc
   {
      title: "Спочатку нове",
      slug: "latest-desc",
      sortKey: "CREATED_AT",
      reverse: true,
   },
   {
      title: "Спочатку дешевше",
      slug: "price-asc",
      sortKey: "PRICE",
      reverse: false,
   }, // asc
   {
      title: "Спочатку дорожче",
      slug: "price-desc",
      sortKey: "PRICE",
      reverse: true,
   },
] as const

export const colorFilter = [
   {
      title: "Червоний",
      slug: "червоний",
   },
   {
      title: "Синій",
      slug: "синій",
   },
   {
      title: "Зелений",
      slug: "зелений",
   },
   {
      title: "Чорний",
      slug: "чорний",
   },
   {
      title: "Білий",
      slug: "білий",
   },
] as const

export const sizeFilter = [
   {
      title: "XS",
      slug: "xs",
   },
   {
      title: "S",
      slug: "s",
   },
   {
      title: "M",
      slug: "m",
   },
   {
      title: "L",
      slug: "l",
   },
   {
      title: "XL",
      slug: "xl",
   },
   {
      title: "2XL",
      slug: "2xl",
   },
]

export const styleFilter = {
   title: "Стиль",
   slug: "style",
   values: ["Казуальний", "Офіційний", "Спортивний", "Вінтажний"],
}

export const materialFilter = {
   title: "Material",
   slug: "material",
   values: ["Бавовна", "Полієстер", "Шовк", "Джинс"],
}
