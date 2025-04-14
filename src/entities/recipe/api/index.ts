import { Recipe } from '../store/recipe-store'
import { API_CONFIG } from '@shared/config/api/config'

interface RecipeResponse {
  data: Recipe
  meta: any
}

export const recipesApi = {
  async getList() {
    const response = await fetch(`${API_CONFIG.BASE_URL}/recipes?populate=*`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json() as { data: Recipe[]; meta: any }
  },

  async getById(id: string) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/recipes/${id}?populate=*`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json() as RecipeResponse
    return result
  }
} 