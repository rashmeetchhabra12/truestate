import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import FilterBar from '../components/FilterBar'
import TransactionTable from '../components/TransactionTable'
import Pagination from '../components/Pagination'
import { transactionAPI } from '../services/api'
import { Transaction, TransactionQuery, PaginatedResponse } from '../types'

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    total: 0,
    total_pages: 0
  })

  const [filters, setFilters] = useState<TransactionQuery>({
    page: 1,
    page_size: 10,
    sort: 'date',
    sort_order: 'DESC'
  })

  const fetchTransactions = async (queryParams: TransactionQuery) => {
    try {
      setLoading(true)
      setError(null)
      
      const response: PaginatedResponse = await transactionAPI.getTransactions(queryParams)
      setTransactions(response.data)
      setPagination({
        page: response.page,
        page_size: response.page_size,
        total: response.total,
        total_pages: response.total_pages
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions(filters)
  }, [filters])

  const handleFilterChange = (newFilters: TransactionQuery) => {
    setFilters({
      ...newFilters,
      page: 1
    })
  }

  const handleSort = (column: string, order: 'ASC' | 'DESC') => {
    setFilters({
      ...filters,
      sort: column,
      sort_order: order,
      page: 1
    })
  }

  const handleSearch = () => {
    setFilters({
      ...filters,
      q: searchInput || undefined,
      page: 1
    })
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setFilters({
      ...filters,
      q: undefined,
      page: 1
    })
  }

  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      page
    })
  }

  return (
    <div className="content">

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by customer name or phone..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Search
          </button>
          {filters.q && (
            <button
              onClick={handleClearSearch}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      {!loading && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {transactions.length} of {pagination.total} transactions
          </div>
          <TransactionTable 
            transactions={transactions}
            onSort={handleSort}
            currentSort={filters.sort}
            currentSortOrder={filters.sort_order}
          />

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}
