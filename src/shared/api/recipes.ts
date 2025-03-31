import axios from 'axios'
import qs from 'qs'
import { RecipeListResponse, RecipeResponse } from './types'

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api'

export const recipesApi = {
  getList: async () => {
    const query = qs.stringify({
      populate: ['images']
    }, {
      encodeValuesOnly: true
    })
    
    const response = await axios.get<RecipeListResponse>(
      `${BASE_URL}/recipes?${query}`
    )
    
    return response.data
  },

  getById: async (documentId: string) => {
    const query = qs.stringify({
      populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category']
    })
    
    const { data } = await axios.get<RecipeResponse>(
      `${BASE_URL}/recipes/${documentId}?${query}`
    )
    
    return data
  }
} 