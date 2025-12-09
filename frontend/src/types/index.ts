export interface Transaction {
  id: number;
  transaction_id: string;
  date: string;
  customer_id: string;
  customer_name: string;
  phone_number?: string;
  gender?: string;
  age?: number;
  customer_region?: string;
  customer_type?: string;
  product_id: string;
  product_name?: string;
  brand?: string;
  product_category?: string;
  tags?: string[];
  quantity?: number;
  price_per_unit?: number;
  discount_percentage?: number;
  total_amount?: number;
  final_amount?: number;
  payment_method?: string;
  order_status?: string;
  delivery_type?: string;
  store_id?: string;
  store_location?: string;
  salesperson_id?: string;
  employee_name?: string;
}

export interface PaginatedResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  data: Transaction[];
}

export interface FilterStats {
  total_records: number;
  regions: string[];
  genders: string[];
  categories: string[];
  payment_methods: string[];
  order_statuses: string[];
  tags: string[];
}

export interface Statistics {
  total_transactions: number;
  total_amount: number;
  average_transaction_amount: number;
  total_units_sold: number;
  total_discount_given: number;
  top_categories: Array<{ category: string; count: number }>;
  top_customers: Array<{ name: string; count: number }>;
}

export interface TransactionQuery {
  q?: string;
  regions?: string;
  genders?: string;
  categories?: string;
  payment_methods?: string;
  order_statuses?: string;
  age_min?: number;
  age_max?: number;
  date_from?: string;
  date_to?: string;
  tags?: string;
  tags_mode?: 'any' | 'all';
  sort?: string;
  sort_order?: 'ASC' | 'DESC';
  page?: number;
  page_size?: number;
}
