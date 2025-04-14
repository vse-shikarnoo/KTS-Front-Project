import { useState, useEffect } from 'react'
import { recipesApi } from '@entities/recipe/api'
import { Recipe } from '@entities/recipe/types'

// Кеш для хранения данных между рендерами
let recipesCache: Recipe[] | null = null

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(recipesCache || [])
  const [loading, setLoading] = useState(!recipesCache)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Если данные уже в кеше, не делаем запрос
    if (recipesCache) return

    const fetchRecipes = async () => {
      try {
        const response = await recipesApi.getList()
        console.log('API Response:', response) // Добавим для отладки
        if (!response?.data) {
          throw new Error('No data in response')
        }
        recipesCache = response.data
        setRecipes(response.data)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch recipes'))
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return { recipes, loading, error }
} 