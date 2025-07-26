import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (typeof price !== 'number' || isNaN(price)) {
    console.log('Invalid price:', price)
    return '$0'
  }
  
  // Formato simple con peso argentino
  return `$${price.toLocaleString('es-AR')}`
}

export function calculateDiscount(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}
