import { useState, useEffect } from 'react'
import { recipesApi } from '@shared/api/recipes'
import { Recipe } from '@shared/api/types'

export const useRecipe = (documentId: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await recipesApi.getById(documentId)
        setRecipe(response.data)
      } catch (err) {
        console.error('API Error:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch recipe'))
      } finally {
        setLoading(false)
      }
    }

    if (documentId) {
      fetchRecipe()
    }
  }, [documentId])

  return { recipe, loading, error }
} 