import type { Product, Combo } from "./types"

export const products: Product[] = [
  {
    id: "almendras",
    name: "Almendras Premium",
    price: 22500,
    image: "/images/almendras.png",
    description: "Almendras naturales de primera calidad, ricas en vitamina E y proteínas.",
    category: "frutos-secos",
    weight: "250g",
    benefits: ["Rica en vitamina E", "Alto contenido proteico", "Grasas saludables"],
    featured: true,
    nutritionalInfo: {
      calories: 579,
      protein: 21,
      carbs: 22,
      fat: 50,
    },
  },
  {
    id: "mani",
    name: "Maní Tostado",
    price: 11800,
    image: "/images/mani.png",
    description: "Maní tostado sin sal, perfecto para snacks saludables.",
    category: "frutos-secos",
    weight: "300g",
    benefits: ["Rico en proteínas", "Fuente de energía", "Sin sal agregada"],
    nutritionalInfo: {
      calories: 567,
      protein: 26,
      carbs: 16,
      fat: 49,
    },
  },
  {
    id: "mix-seco",
    name: "Mix Seco Premium",
    price: 32200,
    image: "/images/mix-seco.png",
    description: "Mezcla premium de frutos secos: almendras, nueces, avellanas y pasas.",
    category: "mix",
    weight: "400g",
    benefits: ["Variedad de nutrientes", "Antioxidantes naturales", "Energía duradera"],
    featured: true,
    nutritionalInfo: {
      calories: 520,
      protein: 18,
      carbs: 25,
      fat: 42,
    },
  },
  {
    id: "maicena",
    name: "Maicena Orgánica",
    price: 12200,
    image: "/images/maicena.png",
    description: "Maicena orgánica certificada, ideal para repostería y cocina.",
    category: "harinas",
    weight: "500g",
    benefits: ["Orgánica certificada", "Sin gluten", "Versátil en cocina"],
    nutritionalInfo: {
      calories: 381,
      protein: 0.3,
      carbs: 91,
      fat: 0.1,
    },
  },
]

export const combos: Combo[] = [
  {
    id: "combo-energetico",
    name: "Combo Energético",
    products: [products[0], products[1], products[2]],
    originalPrice: 7500,
    discountedPrice: 6500,
    image: "/combos/Combo.png",
    description: "Combo perfecto para deportistas y personas activas.",
    savings: 1000,
    featured: true,
  },
  {
    id: "combo-familiar",
    name: "Combo Familiar",
    products: [products[1], products[2], products[3]],
    originalPrice: 6200,
    discountedPrice: 5200,
    image: "/combos/Combo.png",
    description: "Ideal para compartir en familia, productos naturales y saludables.",
    savings: 1000,
    featured: true,
  },
  {
    id: "combo-saludable",
    name: "Combo Saludable",
    products: [products[0], products[1], products[2]],
    originalPrice: 7500,
    discountedPrice: 6500,
    image: "/combos/Combo.png",
    description: "Combo perfecto para deportistas y personas activas.",
    savings: 1000,
    featured: false,
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getComboById(id: string): Combo | undefined {
  return combos.find((combo) => combo.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getCombos(): Combo[] {
  return combos
}

export function getIndividualProducts(): Product[] {
  return products
}
