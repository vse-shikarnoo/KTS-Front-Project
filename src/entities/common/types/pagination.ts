export interface PaginationMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
} 