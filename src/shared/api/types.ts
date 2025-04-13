export interface Recipe {
  id: number
  documentId: string
  name: string
  summary: string
  totalTime: number
  images: Array<{
    id: number
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    createdAt: string
    updatedAt: string
    formats: {
      thumbnail: { url: string }
      small: { url: string }
      medium: { url: string }
      large: { url: string }
    }
  }>
}

export interface RecipeListResponse {
  data: Recipe[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface RecipeResponse {
  data: Recipe
} 