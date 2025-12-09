import axios from 'axios'
import { PaginatedResponse, FilterStats, Statistics, TransactionQuery, Transaction } from '../types'

const API_BASE = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const transactionAPI = {
  // Get all transactions with filters
  getTransactions: async (query: TransactionQuery): Promise<PaginatedResponse> => {
    const params = {
      q: query.q,
      regions: query.regions,
      genders: query.genders,
      categories: query.categories,
      payment_methods: query.payment_methods,
      order_statuses: query.order_statuses,
      age_min: query.age_min,
      age_max: query.age_max,
      date_from: query.date_from,
      date_to: query.date_to,
      tags: query.tags,
      tags_mode: query.tags_mode,
      sort: query.sort,
      sort_order: query.sort_order,
      page: query.page,
      page_size: query.page_size
    }
    
    const response = await api.get<PaginatedResponse>('/transactions', { params })
    return response.data
  },

  // Get single transaction
  getTransactionById: async (id: string): Promise<Transaction> => {
    const response = await api.get<Transaction>(`/transactions/${id}`)
    return response.data
  },

  // Get filter options
  getFilterOptions: async (): Promise<FilterStats> => {
    const response = await api.get<FilterStats>('/transactions/filters')
    return response.data
  },

  // Get statistics
  getStatistics: async (): Promise<Statistics> => {
    const response = await api.get<Statistics>('/transactions/stats')
    return response.data
  },

  // Health check
  health: async () => {
    const response = await api.get('/health')
    return response.data
  }
}

export default api
