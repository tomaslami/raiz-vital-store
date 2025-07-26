"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "./types"

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  cart: CartItem[]
}

type CartAction =
  | { type: "ADD_TO_CART"; product: Product; quantity: number }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; cart: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find((item) => item.id === action.product.id)

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + action.quantity } : item,
          ),
        }
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.product, quantity: action.quantity }],
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.productId),
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => (item.id === action.productId ? { ...item, quantity: action.quantity } : item)),
      }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      }

    case "LOAD_CART":
      return {
        ...state,
        cart: action.cart,
      }

    default:
      return state
  }
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("raiz-vital-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", cart: parsedCart })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("raiz-vital-cart", JSON.stringify(state.cart))
  }, [state.cart])

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", product, quantity })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
    }
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
