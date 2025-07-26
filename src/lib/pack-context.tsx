"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "./types"

interface PackItem {
  product: Product
  quantity: number
}

interface PackState {
  packItems: PackItem[]
}

type PackAction =
  | { type: "ADD_TO_PACK"; product: Product }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "REMOVE_FROM_PACK"; productId: string }
  | { type: "CLEAR_PACK" }
  | { type: "LOAD_PACK"; packItems: PackItem[] }

const packReducer = (state: PackState, action: PackAction): PackState => {
  switch (action.type) {
    case "ADD_TO_PACK": {
      const existingItem = state.packItems.find((item) => item.product.id === action.product.id)

      if (existingItem) {
        return {
          ...state,
          packItems: state.packItems.map((item) =>
            item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }

      return {
        ...state,
        packItems: [...state.packItems, { product: action.product, quantity: 1 }],
      }
    }

    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          packItems: state.packItems.filter((item) => item.product.id !== action.productId),
        }
      }
      return {
        ...state,
        packItems: state.packItems.map((item) =>
          item.product.id === action.productId ? { ...item, quantity: action.quantity } : item,
        ),
      }

    case "REMOVE_FROM_PACK":
      return {
        ...state,
        packItems: state.packItems.filter((item) => item.product.id !== action.productId),
      }

    case "CLEAR_PACK":
      return {
        ...state,
        packItems: [],
      }

    case "LOAD_PACK":
      return {
        ...state,
        packItems: action.packItems,
      }

    default:
      return state
  }
}

interface PackContextType {
  packItems: PackItem[]
  addToPack: (product: Product) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeFromPack: (productId: string) => void
  clearPack: () => void
}

const PackContext = createContext<PackContextType | undefined>(undefined)

export function PackProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(packReducer, { packItems: [] })

  // Load pack from sessionStorage on mount
  useEffect(() => {
    const savedPack = sessionStorage.getItem("raiz-vital-pack")
    if (savedPack) {
      try {
        const parsedPack = JSON.parse(savedPack)
        dispatch({ type: "LOAD_PACK", packItems: parsedPack })
      } catch (error) {
        console.error("Error loading pack from sessionStorage:", error)
      }
    }
  }, [])

  // Save pack to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("raiz-vital-pack", JSON.stringify(state.packItems))
  }, [state.packItems])

  const addToPack = (product: Product) => {
    dispatch({ type: "ADD_TO_PACK", product })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
  }

  const removeFromPack = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_PACK", productId })
  }

  const clearPack = () => {
    dispatch({ type: "CLEAR_PACK" })
  }

  return (
    <PackContext.Provider
      value={{
        packItems: state.packItems,
        addToPack,
        updateQuantity,
        removeFromPack,
        clearPack,
      }}
    >
      {children}
    </PackContext.Provider>
  )
}

export function usePack() {
  const context = useContext(PackContext)
  if (context === undefined) {
    throw new Error("usePack must be used within a PackProvider")
  }
  return context
}
