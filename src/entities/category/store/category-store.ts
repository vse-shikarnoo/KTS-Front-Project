import { makeObservable, observable, action, runInAction } from 'mobx'
import { BaseStore } from '@shared/api/base-store'

export interface Category {
  id: number
  title: string
}

export class CategoryStore extends BaseStore {
  categories: Category[] = []

  constructor() {
    super()
    console.log('[DEBUG] CategoryStore: constructor')
    
    makeObservable(this, {
      categories: observable,
      fetchCategories: action,
      getCategoryById: action
    })
  }

  async fetchCategories() {
    console.log('[DEBUG] CategoryStore: fetchCategories start')
    try {
      const response = await this.fetch<{ data: Category[] }>('/meal-categories?populate=*')
      runInAction(() => {
        this.categories = response.data
        console.log('[DEBUG] CategoryStore: categories updated', { count: this.categories.length })
      })
    } catch (error) {
      console.error('[DEBUG] CategoryStore: fetchCategories error', error)
      throw error
    }
  }

  getCategoryById(id: number): Category | undefined {
    console.log('[DEBUG] CategoryStore: getCategoryById', { id })
    return this.categories.find(category => category.id === id)
  }
} 