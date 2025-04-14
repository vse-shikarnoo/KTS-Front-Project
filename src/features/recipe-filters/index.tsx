import React, { FC, memo, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@shared/hooks/useStore'
import { Category } from '@entities/category/store/category-store'
import styles from './styles.module.scss'

// Изолированный компонент поиска
const SearchInput = memo(({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  console.log('[DEBUG] RENDER: SearchInput')
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, [onChange])
  
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Поиск рецептов..."
      className={styles.searchInput}
    />
  )
})

// Изолированный компонент категории
const CategoryItem = memo(({ 
  category, 
  isSelected, 
  onClick 
}: { 
  category: Category; 
  isSelected: boolean; 
  onClick: (id: number) => void 
}) => {
  console.log('[DEBUG] RENDER: CategoryItem', { categoryId: category.id })
  
  const handleClick = useCallback(() => {
    onClick(category.id)
  }, [category.id, onClick])
  
  return (
    <button
      className={`${styles.categoryButton} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      {category.title}
    </button>
  )
})

// Изолированный список категорий
const CategoryList = memo(({ 
  categories, 
  selectedId, 
  onSelect 
}: { 
  categories: Category[]; 
  selectedId: number | null; 
  onSelect: (id: number) => void 
}) => {
  console.log('[DEBUG] RENDER: CategoryList')
  
  return (
    <div className={styles.categories}>
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          category={category}
          isSelected={category.id === selectedId}
          onClick={onSelect}
        />
      ))}
    </div>
  )
})

// Контейнер для управления состоянием фильтров
const FiltersContainer = observer(() => {
  console.log('[DEBUG] RENDER: FiltersContainer')
  const { recipeStore, categoryStore } = useStore()
  
  const handleSearchChange = useCallback((value: string) => {
    recipeStore.setSearchQuery(value)
  }, [recipeStore])
  
  const handleCategorySelect = useCallback((categoryId: number) => {
    recipeStore.setSelectedCategoryId(categoryId)
  }, [recipeStore])
  
  return (
    <>
      <SearchInput 
        value={recipeStore.searchQuery} 
        onChange={handleSearchChange} 
      />
      <CategoryList
        categories={categoryStore.categories}
        selectedId={recipeStore.selectedCategoryId}
        onSelect={handleCategorySelect}
      />
    </>
  )
})

// Корневой компонент фильтров
export const RecipeFilters: FC = memo(() => {
  console.log('[DEBUG] RENDER: RecipeFilters')
  return (
    <div className={styles.filters}>
      <FiltersContainer />
    </div>
  )
}) 