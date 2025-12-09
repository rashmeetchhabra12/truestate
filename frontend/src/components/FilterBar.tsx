import { ChevronDown } from 'lucide-react'
import { TransactionQuery } from '../types'

interface FilterBarProps {
  filters: TransactionQuery
  onFilterChange: (filters: TransactionQuery) => void
}

const filterOptions = {
  regions: ['North', 'South', 'East', 'West', 'Central'],
  genders: ['Male', 'Female', 'Other'],
  categories: ['Clothing', 'Electronics', 'Food', 'Books', 'Home & Garden'],
  paymentMethods: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash'],
  orderStatuses: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  ageRanges: ['18-25', '26-35', '36-45', '46-55', '56+']
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleFilterChange = (key: keyof TransactionQuery, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
      page: 1
    })
  }

  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value && key !== 'page' && key !== 'page_size' && key !== 'sort' && key !== 'sort_order'
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Region Filter */}
        <div className="relative">
          <select
            value={filters.regions || ''}
            onChange={(e) => handleFilterChange('regions', e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
          >
            <option value="">Customer Region</option>
            {filterOptions.regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Gender Filter */}
        <div className="relative">
          <select
            value={filters.genders || ''}
            onChange={(e) => handleFilterChange('genders', e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
          >
            <option value="">Gender</option>
            {filterOptions.genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Age Range Filter */}
        <div className="relative">
          <select
            value={filters.age_min ? `${filters.age_min}-${filters.age_max}` : ''}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number)
              onFilterChange({
                ...filters,
                age_min: min || undefined,
                age_max: max || undefined,
                page: 1
              })
            }}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
          >
            <option value="">Age Range</option>
            {filterOptions.ageRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Product Category Filter */}
        <div className="relative">
          <select
            value={filters.categories || ''}
            onChange={(e) => handleFilterChange('categories', e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
          >
            <option value="">Product Category</option>
            {filterOptions.categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Tags Filter */}
        <div className="relative">
          <select
            value={filters.tags || ''}
            onChange={(e) => handleFilterChange('tags', e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
          >
            <option value="">Tags</option>
            <option value="premium">Premium</option>
            <option value="bestseller">Bestseller</option>
            <option value="new">New</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Payment Method Filter */}
        <div className="relative">
          <select
            value={filters.payment_methods || ''}
            onChange={(e) => handleFilterChange('payment_methods', e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
          >
            <option value="">Payment Method</option>
            {filterOptions.paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <select
            value={filters.order_statuses || ''}
            onChange={(e) => handleFilterChange('order_statuses', e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
          >
            <option value="">Date</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        {/* Sort Dropdown */}
        <div className="ml-auto relative">
          <select
            value={filters.sort || 'date'}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
          >
            <option value="date">Sort by: Date</option>
            <option value="customer_name">Customer Name</option>
            <option value="total_amount">Amount</option>
            <option value="quantity">Quantity</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map(([key, value]) => (
            <span key={key} className="filter-badge">
              {key}: {String(value)}
              <button
                onClick={() => handleFilterChange(key as keyof TransactionQuery, '')}
                className="ml-1 hover:opacity-80"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
