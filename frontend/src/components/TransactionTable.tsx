import { Transaction } from '../types'
import { Copy, ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface TransactionTableProps {
  transactions: Transaction[]
  onRowClick?: (transaction: Transaction) => void
  onSort?: (column: string, order: 'ASC' | 'DESC') => void
  currentSort?: string
  currentSortOrder?: 'ASC' | 'DESC'
}

export default function TransactionTable({ 
  transactions, 
  onRowClick, 
  onSort,
  currentSort,
  currentSortOrder
}: TransactionTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  void copiedId

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatCurrency = (amount?: number) => {
    if (!amount) return '₹0'
    return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
  }

  const handleHeaderClick = (columnName: string) => {
    if (!onSort) return
    
    const newOrder = currentSort === columnName && currentSortOrder === 'ASC' ? 'DESC' : 'ASC'
    onSort(columnName, newOrder)
  }

  const SortHeader = ({ label, column }: { label: string; column: string }) => {
    const isSorted = currentSort === column
    return (
      <th 
        className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => handleHeaderClick(column)}
      >
        <div className="flex items-center gap-2">
          <span>{label}</span>
          {isSorted && (
            currentSortOrder === 'ASC' ? 
              <ChevronUp size={14} className="text-purple-600" /> : 
              <ChevronDown size={14} className="text-purple-600" />
          )}
        </div>
      </th>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <SortHeader label="Transaction ID" column="transaction_id" />
              <SortHeader label="Date" column="date" />
              <SortHeader label="Customer ID" column="customer_id" />
              <SortHeader label="Customer Name" column="customer_name" />
              <SortHeader label="Phone" column="phone_number" />
              <SortHeader label="Gender" column="gender" />
              <SortHeader label="Age" column="age" />
              <SortHeader label="Region" column="customer_region" />
              <SortHeader label="Type" column="customer_type" />
              <SortHeader label="Product ID" column="product_id" />
              <SortHeader label="Product Name" column="product_name" />
              <SortHeader label="Brand" column="brand" />
              <SortHeader label="Category" column="product_category" />
              <SortHeader label="Tags" column="tags" />
              <SortHeader label="Quantity" column="quantity" />
              <SortHeader label="Price/Unit" column="price_per_unit" />
              <SortHeader label="Discount %" column="discount_percentage" />
              <SortHeader label="Total Amount" column="total_amount" />
              <SortHeader label="Final Amount" column="final_amount" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => onRowClick?.(transaction)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-gray-900 font-mono whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span>{transaction.transaction_id}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(transaction.transaction_id, transaction.transaction_id)
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Copy ID"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.date}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.customer_id}
                </td>
                <td className="px-4 py-3 text-gray-900">
                  {transaction.customer_name}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.phone_number || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.gender || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.age || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.customer_region || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.customer_type || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.product_id}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.product_name || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.brand || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.product_category || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {transaction.tags?.join(', ') || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 text-right whitespace-nowrap">
                  {transaction.quantity || 0}
                </td>
                <td className="px-4 py-3 text-gray-600 text-right whitespace-nowrap">
                  {formatCurrency(transaction.price_per_unit)}
                </td>
                <td className="px-4 py-3 text-gray-600 text-right whitespace-nowrap">
                  {transaction.discount_percentage ? `${transaction.discount_percentage}%` : '-'}
                </td>
                <td className="px-4 py-3 text-gray-600 text-right whitespace-nowrap">
                  {formatCurrency(transaction.total_amount)}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 text-right whitespace-nowrap">
                  {formatCurrency(transaction.final_amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}
    </div>
  )
}
