import { createContext, FC, ReactNode, useRef, useEffect } from 'react'
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

// Создаем сторы один раз при загрузке модуля
console.log('[DEBUG] StoreProvider: Creating global stores')
const recipeStore = new RecipeStore()
const categoryStore = new CategoryStore()

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const renderCount = useRef(0)
  
  useEffect(() => {
    renderCount.current++
    console.log(`[DEBUG] StoreProvider: rendered (count: ${renderCount.current})`)
  })
  
  console.log('[DEBUG] StoreProvider: render')
  
  return (
    <StoreContext.Provider value={{ recipeStore, categoryStore }}>
      {children}
    </StoreContext.Provider>
  )
} 