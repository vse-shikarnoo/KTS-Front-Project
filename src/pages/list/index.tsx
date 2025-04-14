import React, { FC, memo, useEffect, useState, PropsWithChildren } from 'react'
import { observer } from 'mobx-react-lite'
import { RecipeFilters } from '@features/recipe-filters'
import { RecipeList } from '@widgets/recipe-list'
import { useStore } from '@shared/hooks/useStore'
import { LoadingOverlay } from '@shared/ui/loading-overlay'
import styles from './styles.module.scss'

// Компонент для отслеживания рендеров
const RenderLogger = ({ name, children }: PropsWithChildren<{ name: string }>) => {
  console.log(`[DEBUG] RENDER: ${name}`)
  return <>{children}</>
}

// Чистый компонент для отображения состояния загрузки
const LoadingState = memo(() => {
  console.log('[DEBUG] RENDER: LoadingState')
  return <LoadingOverlay message="Загрузка рецептов..." />
})

// Чистый компонент для отображения ошибки
const ErrorState = memo(({ message }: { message: string }) => {
  console.log('[DEBUG] RENDER: ErrorState', { message })
  return <div className={styles.error}>Ошибка: {message}</div>
})

// Компонент для начальной загрузки данных
const DataLoader = observer(({ onLoaded }: { onLoaded: () => void }) => {
  const { recipeStore, categoryStore } = useStore()
  console.log('[DEBUG] RENDER: DataLoader')
  
  useEffect(() => {
    console.log('[DEBUG] DataLoader: useEffect triggered')
    
    const loadData = async () => {
      console.log('[DEBUG] DataLoader: loadData start')
      try {
        await Promise.all([
          categoryStore.fetchCategories(),
          recipeStore.fetchRecipes()
        ])
        console.log('[DEBUG] DataLoader: loadData complete')
        onLoaded()
      } catch (error) {
        console.error('[DEBUG] DataLoader: loadData error', error)
        onLoaded()
      }
    }
    
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return null
})

// Компоненты-обертки, чтобы изолировать изменения состояния
const SearchContainer = memo(() => {
  console.log('[DEBUG] RENDER: SearchContainer')
  return <RecipeFilters />
})

const ContentContainer = observer(() => {
  const { recipeStore } = useStore()
  const { error } = recipeStore
  console.log('[DEBUG] RENDER: ContentContainer', { hasError: !!error })
  
  if (error) {
    return <ErrorState message={error.message} />
  }
  
  return <RecipeList />
})

// Главный компонент страницы
export const ListPage: FC = () => {
  console.log('[DEBUG] RENDER: ListPage')
  const [isLoading, setIsLoading] = useState(true)
  
  const handleDataLoaded = () => {
    console.log('[DEBUG] ListPage: handleDataLoaded')
    setIsLoading(false)
  }
  
  return (
    <RenderLogger name="ListPage-Root">
      <DataLoader onLoaded={handleDataLoaded} />
      <div className={styles.container} style={{ opacity: isLoading ? 0.5 : 1 }}>
        <SearchContainer />
        {isLoading ? <LoadingState /> : <ContentContainer />}
      </div>
    </RenderLogger>
  )
} 