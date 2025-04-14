import { useState, useEffect } from 'react'
import { Recipe } from '@entities/recipe/store/recipe-store'
import { recipesApi } from '@entities/recipe/api'

interface RecipeResponse {
  data: Recipe
  meta: any
}

export const useRecipe = (documentId: string | undefined) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!documentId) {
      setLoading(false)
      return
    }

    console.log('Fetching recipe with documentId:', documentId)

    const fetchRecipe = async () => {
      try {
        setLoading(true)
        const response = await recipesApi.getById(documentId)
        console.log('Received recipe data:', response)
        setRecipe(response.data)
      } catch (err) {
        console.error('Error fetching recipe:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch recipe'))
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [documentId])

  return { recipe, loading, error }
} 