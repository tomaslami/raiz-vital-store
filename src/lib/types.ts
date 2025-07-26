export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  weight?: string
  featured?: boolean
  longDescription?: string
  benefits?: string[]
  nutritionalInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

export interface Combo {
  id: string
  name: string
  products: Product[]
  originalPrice: number
  discountedPrice: number
  image: string
  description: string
  savings: number
  featured?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface PackItem {
  product: Product
  quantity: number
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  notes?: string
}
