import { createContext, FC, ReactNode } from 'react'
import { RecipeStore } from '@entities/recipe/store/recipe-store'
import { CategoryStore } from '@entities/category/store/category-store'

interface StoreContextValue {
  recipeStore: RecipeStore
  categoryStore: CategoryStore
}

export const StoreContext = createContext<StoreContextValue | null>(null)

interface StoreProviderProps {
  children: ReactNode
}

const recipeStore = new RecipeStore()
const categoryStore = new CategoryStore()

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={{ recipeStore, categoryStore }}>
      {children}
    </StoreContext.Provider>
  )
} 