import { seoFragment } from "@/seo/constants"

const imageFragment = `
  fragment image on Image {
    url
    altText
    width
    height
  }
`

export const productFragment = `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
`

export const colorMap: Record<string, string> = {
   Білий: "#ffffff", // White
   Чорний: "#000000", // Black
   Червоний: "#ff0000", // Red
   Синій: "#0000ff", // Blue
   Зелений: "#008000", // Green
   Жовтий: "#ffff00", // Yellow
   Сірий: "#808080", // Grey
   Коричневий: "#8b4513", // Brown
   Оранжевий: "#ffa500", // Orange
   Фіолетовий: "#800080", // Purple
   Рожевий: "#ffc0cb", // Pink
   Блакитний: "#add8e6", // Light Blue
   Золотий: "#ffd700", // Gold
   Сріблястий: "#c0c0c0", // Silver
   Лавандовий: "#e6e6fa", // Lavender
   Бірюзовий: "#40e0d0", // Turquoise
   "Темно-синій": "#00008b", // Dark Blue
   "Темно-зелений": "#006400", // Dark Green
   Лимонний: "#fff700", // Lemon
   "Морська хвиля": "#2e8b57", // Sea Green
   Малиновий: "#e30b5d", // Raspberry
   Ліловий: "#d8a7ff", // Lilac
   "Яскраво-червоний": "#ff2400", // Scarlet
   Бежевий: "#f5f5dc", // Beige
   Персиковий: "#ffcc99", // Peach
   Петролевий: "#1d5f7a", // Petrol
   Теракотовий: "#e2725b", // Terracotta
   "М'ятний": "#98ff98", // Mint
   Хакі: "#6b8e23", // Khaki
   Кораловий: "#ff7f50", // Coral
}
