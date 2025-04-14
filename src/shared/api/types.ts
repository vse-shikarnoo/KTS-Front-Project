export interface Recipe {
  id: string
  documentId: string
  name: string
  description: string
  imageUrl?: string
  image?: string
  summary?: string
  totalTime?: number
  categoryId: string
  createdAt: string
  updatedAt: string
} 