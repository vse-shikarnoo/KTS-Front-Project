import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { RecipeStore } from '@entities/recipe/store/recipe-store'
import styles from './styles.module.scss'

interface SearchPortalProps {
  recipeStore: RecipeStore
}

export const SearchPortal: React.FC<SearchPortalProps> = ({ recipeStore }) => {
  console.log('[DEBUG] RENDER: SearchPortal')
  const [searchContainer, setSearchContainer] = useState<HTMLDivElement | null>(null)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })

  // Создаем контейнер и отслеживаем позицию placeholder
  useEffect(() => {
    console.log('[DEBUG] SearchPortal: useEffect for container creation')
    // Создаем контейнер
    let container = document.getElementById('search-portal-container') as HTMLDivElement
    
    if (!container) {
      console.log('[DEBUG] SearchPortal: creating new container')
      container = document.createElement('div')
      container.id = 'search-portal-container'
      document.body.appendChild(container)
    } else {
      console.log('[DEBUG] SearchPortal: reusing existing container')
    }
    
    setSearchContainer(container)

    // Функция для обновления позиции
    const updatePosition = () => {
      const placeholder = document.getElementById('search-placeholder')
      if (placeholder) {
        const rect = placeholder.getBoundingClientRect()
        console.log('[DEBUG] SearchPortal: updating position', { 
          top: rect.top, 
          left: rect.left, 
          width: rect.width 
        })
        setPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width
        })
      } else {
        console.log('[DEBUG] SearchPortal: placeholder not found')
      }
    }

    // Обновляем позицию сразу и при изменении размера окна
    updatePosition()
    window.addEventListener('resize', updatePosition)
    
    return () => {
      console.log('[DEBUG] SearchPortal: cleanup effect')
      window.removeEventListener('resize', updatePosition)
      if (container && container.parentNode) {
        container.parentNode.removeChild(container)
      }
    }
  }, [])
  
  // Если контейнер еще не создан, ничего не рендерим
  if (!searchContainer) {
    console.log('[DEBUG] SearchPortal: container not created yet')
    return null
  }
  
  console.log('[DEBUG] SearchPortal: rendering portal', { position })
  
  // Рендерим содержимое в портал
  return createPortal(
    <div style={{ 
      position: 'absolute', 
      top: `${position.top}px`, 
      left: `${position.left}px`,
      width: `${position.width}px` 
    }}>
      <SearchInputDirect recipeStore={recipeStore} />
    </div>,
    searchContainer
  )
}

// Компонент с прямой манипуляцией DOM
const SearchInputDirect: React.FC<SearchPortalProps> = ({ recipeStore }) => {
  console.log('[DEBUG] RENDER: SearchInputDirect')
  const inputRef = useRef<HTMLInputElement>(null)
  const lastValueRef = useRef(recipeStore.searchQuery)
  
  useEffect(() => {
    console.log('[DEBUG] SearchInputDirect: useEffect for DOM manipulation')
    const inputElement = inputRef.current
    if (!inputElement) {
      console.log('[DEBUG] SearchInputDirect: input element not found')
      return
    }
    
    // Устанавливаем начальное значение
    inputElement.value = recipeStore.searchQuery
    console.log('[DEBUG] SearchInputDirect: set initial value', { value: recipeStore.searchQuery })
    
    // Функция для обработки ввода напрямую
    const handleInput = () => {
      if (inputElement) {
        const newValue = inputElement.value
        if (newValue !== lastValueRef.current) {
          console.log('[DEBUG] SearchInputDirect: input changed', { 
            oldValue: lastValueRef.current, 
            newValue 
          })
          lastValueRef.current = newValue
          recipeStore.setSearchQuery(newValue)
        }
      }
    }
    
    // Прикрепляем обработчик
    console.log('[DEBUG] SearchInputDirect: attaching event listener')
    inputElement.addEventListener('input', handleInput)
    
    return () => {
      console.log('[DEBUG] SearchInputDirect: removing event listener')
      inputElement.removeEventListener('input', handleInput)
    }
  }, [recipeStore])
  
  return (
    <div className={styles.search}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск рецептов..."
        className={styles.searchInput}
      />
    </div>
  )
} 