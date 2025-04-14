import { makeObservable, observable, action, runInAction } from 'mobx'
import { BaseStore } from '@shared/api/base-store'
import { API_CONFIG } from '@shared/config/api/config'
import qs from 'qs'
import debounce from 'lodash/debounce'

export interface Recipe {
  id: number
  documentId: string
  name: string
  images: Array<{ url: string }>
  totalTime: number
  summary: string
}

interface PaginationMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export class RecipeStore extends BaseStore {
  recipes: Recipe[] = []
  searchQuery = ''
  selectedCategoryId: number | null = null
  currentPage = 1
  pageSize = 10
  totalPages = 1
  isSearching = false
  private debouncedFetchRecipes: () => void

  constructor() {
    super()
    console.log('[DEBUG] RecipeStore: constructor')
    
    makeObservable(this, {
      recipes: observable,
      searchQuery: observable,
      selectedCategoryId: observable,
      currentPage: observable,
      pageSize: observable,
      totalPages: observable,
      isSearching: observable,
      setSearchQuery: action,
      setSelectedCategoryId: action,
      fetchRecipes: action
    })
    
    this.debouncedFetchRecipes = debounce(this.debouncedFetchRecipesAction, 300)
  }

  private debouncedFetchRecipesAction = async () => {
    console.log('[DEBUG] RecipeStore: debouncedFetchRecipes start')
    runInAction(() => {
      this.isSearching = true
    })

    try {
      await this.fetchRecipes()
    } finally {
      runInAction(() => {
        this.isSearching = false
      })
      console.log('[DEBUG] RecipeStore: debouncedFetchRecipes end')
    }
  }

  setSearchQuery(query: string) {
    console.log('[DEBUG] RecipeStore: setSearchQuery', { oldValue: this.searchQuery, newValue: query })
    this.searchQuery = query
    this.currentPage = 1
    this.debouncedFetchRecipes()
  }

  setSelectedCategoryId(categoryId: number | null) {
    console.log('[DEBUG] RecipeStore: setSelectedCategoryId', { oldValue: this.selectedCategoryId, newValue: categoryId })
    this.selectedCategoryId = categoryId
    this.currentPage = 1
    this.fetchRecipes()
  }

  private async searchFetch<T>(endpoint: string, params = {}): Promise<T> {
    console.log('[DEBUG] RecipeStore: searchFetch start')
    const queryString = qs.stringify(params, { encodeValuesOnly: true })
    const response = await this.fetch<T>(`${endpoint}?${queryString}`)
    console.log('[DEBUG] RecipeStore: searchFetch success')
    return response
  }

  async fetchRecipes() {
    console.log('[DEBUG] RecipeStore: fetchRecipes start')
    const params: any = {
      populate: '*',
      'pagination[page]': this.currentPage,
      'pagination[pageSize]': this.pageSize
    }

    if (this.searchQuery) {
      params['filters[name][$containsi]'] = this.searchQuery
    }

    if (this.selectedCategoryId) {
      params['filters[category][id]'] = this.selectedCategoryId
    }

    console.log('[DEBUG] RecipeStore: fetchRecipes query', qs.stringify(params))

    const response = await this.searchFetch<{
      data: Recipe[]
      meta: { pagination: { total: number; pageCount: number } }
    }>('/recipes', params)

    console.log('[DEBUG] RecipeStore: fetchRecipes response received', {
      recipesCount: response.data.length,
      totalPages: response.meta.pagination.pageCount
    })

    runInAction(() => {
      this.recipes = response.data
      this.totalPages = response.meta.pagination.pageCount
      console.log('[DEBUG] RecipeStore: fetchRecipes state updated')
    })
  }
} 