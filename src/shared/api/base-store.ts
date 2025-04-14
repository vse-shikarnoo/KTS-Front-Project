import { makeObservable, observable, action } from 'mobx'
import { API_CONFIG } from '@shared/config/api/config'

export class BaseStore {
  loading = false
  error: Error | null = null

  constructor() {
    console.log('[DEBUG] BaseStore: constructor')
    makeObservable(this, {
      loading: observable,
      error: observable,
      setLoading: action,
      setError: action
    })
  }

  protected setLoading(loading: boolean) {
    console.log('[DEBUG] BaseStore: setLoading', { oldValue: this.loading, newValue: loading })
    this.loading = loading
  }

  protected setError(error: Error | null) {
    console.log('[DEBUG] BaseStore: setError', { 
      oldValue: this.error?.message, 
      newValue: error?.message 
    })
    this.error = error
  }

  protected async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    console.log('[DEBUG] BaseStore: fetch start', { url })
    this.setLoading(true)
    this.setError(null)

    try {
      console.log('[DEBUG] BaseStore: fetch making request')
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('[DEBUG] BaseStore: fetch success')
      return data
    } catch (error) {
      console.log('[DEBUG] BaseStore: fetch error', error)
      this.setError(error instanceof Error ? error : new Error('Unknown error'))
      throw error
    } finally {
      console.log('[DEBUG] BaseStore: fetch complete')
      this.setLoading(false)
    }
  }
} 