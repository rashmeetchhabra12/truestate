"""
TruEstate Backend API
FastAPI + PostgreSQL
Handles filtering, search, sorting, and pagination
"""

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from typing import Optional, List
from pydantic import BaseModel

# Database config
DB_CONFIG = {
    'host': 'db.shdwklxuipujijlcppje.supabase.co',
    'port': 5432,
    'database': 'postgres',
    'user': 'postgres',
    'password': 'W4W7*Ns?P-+3VE2'
}

# Response models
class TransactionResponse(BaseModel):
    id: int
    transaction_id: str
    date: str
    customer_id: str
    customer_name: str
    phone_number: Optional[str]
    gender: Optional[str]
    age: Optional[int]
    customer_region: Optional[str]
    customer_type: Optional[str]
    product_id: str
    product_name: Optional[str]
    brand: Optional[str]
    product_category: Optional[str]
    tags: Optional[List[str]]
    quantity: Optional[int]
    price_per_unit: Optional[float]
    discount_percentage: Optional[float]
    total_amount: Optional[float]
    final_amount: Optional[float]
    payment_method: Optional[str]
    order_status: Optional[str]
    delivery_type: Optional[str]
    store_id: Optional[str]
    store_location: Optional[str]
    salesperson_id: Optional[str]
    employee_name: Optional[str]

    class Config:
        from_attributes = True

class PaginatedResponse(BaseModel):
    total: int
    page: int
    page_size: int
    total_pages: int
    data: List[TransactionResponse]

class FilterStats(BaseModel):
    total_records: int
    regions: List[str]
    genders: List[str]
    categories: List[str]
    payment_methods: List[str]
    order_statuses: List[str]
    age_range: dict  # min, max
    date_range: dict  # min, max

# Global connection pool (simplified)
class DBConnection:
    def __init__(self):
        self.conn = None
    
    def connect(self):
        try:
            self.conn = psycopg2.connect(**DB_CONFIG, connect_timeout=5)
            # For read-only API, use autocommit mode
            self.conn.autocommit = True
        except Exception as e:
            print(f"Connection error: {e}")
            raise
    
    def disconnect(self):
        if self.conn:
            try:
                self.conn.close()
            except:
                pass
    
    def execute_query(self, query, params=None):
        try:
            cursor = self.conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute(query, params or ())
            return cursor
        except psycopg2.errors.InFailedSqlTransaction:
            # Transaction is in failed state, rollback and retry
            try:
                self.conn.rollback()
            except:
                pass
            # Try to reconnect
            try:
                self.conn.close()
            except:
                pass
            self.connect()
            cursor = self.conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute(query, params or ())
            return cursor
        except psycopg2.errors.QueryCanceled:
            # Query was canceled (timeout), close connection
            try:
                self.conn.close()
            except:
                pass
            self.connect()
            raise  # Re-raise the timeout error

app = FastAPI(
    title="TruEstate API",
    description="Retail Sales Management System API",
    version="1.0.0"
)

db = None

@app.on_event("startup")
async def startup_event():
    global db
    db = DBConnection()
    db.connect()
    print("[OK] Connected to Supabase PostgreSQL")

@app.on_event("shutdown")
async def shutdown_event():
    global db
    if db:
        db.disconnect()
    print("[CLOSE] Disconnected from database")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def build_filter_query(
    q: Optional[str] = None,
    regions: Optional[str] = None,
    genders: Optional[str] = None,
    categories: Optional[str] = None,
    payment_methods: Optional[str] = None,
    order_statuses: Optional[str] = None,
    age_min: Optional[int] = None,
    age_max: Optional[int] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    tags: Optional[str] = None,
    tags_mode: str = "any",
    sort: str = "date",
    sort_order: str = "DESC",
    page: int = 1,
    page_size: int = 10,
):
    """Build SQL query with all filters"""
    
    where_clauses = []
    params = []
    
    # Full-text search on customer_name only (faster than checking multiple fields)
    if q:
        where_clauses.append("""
            customer_name ILIKE %s
        """)
        search_term = f"%{q}%"
        params.append(search_term)
    
    # Region filter (multi-select)
    if regions:
        region_list = [r.strip() for r in regions.split(',')]
        placeholders = ','.join(['%s'] * len(region_list))
        where_clauses.append(f"customer_region IN ({placeholders})")
        params.extend(region_list)
    
    # Gender filter (multi-select)
    if genders:
        gender_list = [g.strip() for g in genders.split(',')]
        placeholders = ','.join(['%s'] * len(gender_list))
        where_clauses.append(f"gender IN ({placeholders})")
        params.extend(gender_list)
    
    # Product category filter (multi-select)
    if categories:
        category_list = [c.strip() for c in categories.split(',')]
        placeholders = ','.join(['%s'] * len(category_list))
        where_clauses.append(f"product_category IN ({placeholders})")
        params.extend(category_list)
    
    # Payment method filter (multi-select)
    if payment_methods:
        pm_list = [pm.strip() for pm in payment_methods.split(',')]
        placeholders = ','.join(['%s'] * len(pm_list))
        where_clauses.append(f"payment_method IN ({placeholders})")
        params.extend(pm_list)
    
    # Order status filter (multi-select)
    if order_statuses:
        os_list = [os.strip() for os in order_statuses.split(',')]
        placeholders = ','.join(['%s'] * len(os_list))
        where_clauses.append(f"order_status IN ({placeholders})")
        params.extend(os_list)
    
    # Age range filter
    if age_min is not None:
        where_clauses.append("age >= %s")
        params.append(age_min)
    if age_max is not None:
        where_clauses.append("age <= %s")
        params.append(age_max)
    
    # Date range filter
    if date_from:
        where_clauses.append("date >= %s::date")
        params.append(date_from)
    if date_to:
        where_clauses.append("date <= %s::date")
        params.append(date_to)
    
    # Tags filter (simplified to avoid timeout)
    if tags:
        try:
            tags_list = [t.strip() for t in tags.split(',') if t.strip()][:3]  # Limit to 3 tags
            if tags_list:
                # Use simpler string matching instead of array operations
                tag_conditions = []
                for tag in tags_list:
                    tag_escaped = tag.replace("'", "''")
                    tag_conditions.append(f"tags::text ILIKE '%{tag_escaped}%'")
                where_clauses.append(f"({' OR '.join(tag_conditions)})")
        except:
            pass
    
    # Build WHERE clause
    where_clause = " AND ".join(where_clauses) if where_clauses else "1=1"
    
    # Validate sort column
    valid_sorts = ['date', 'customer_name', 'final_amount', 'age', 'customer_region', 'product_category', 'order_status']
    if sort not in valid_sorts:
        sort = 'date'
    
    # Validate sort order
    if sort_order.upper() not in ['ASC', 'DESC']:
        sort_order = 'DESC'
    
    # Calculate offset
    offset = (page - 1) * page_size
    
    # Build count query
    count_query = f"SELECT COUNT(*) as total FROM transactions WHERE {where_clause}"
    
    # Build data query
    data_query = f"""
        SELECT * FROM transactions 
        WHERE {where_clause}
        ORDER BY {sort} {sort_order}
        LIMIT %s OFFSET %s
    """
    params_count = params.copy()
    params_data = params.copy() + [page_size, offset]
    
    return count_query, data_query, params_count, params_data

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/api/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    print("DEBUG: health_check called")
    try:
        print(f"DEBUG: db object = {db}")
        return {
            "status": "healthy",
            "service": "TruEstate API",
            "version": "1.0.0"
        }
    except Exception as e:
        print(f"DEBUG: Exception in health_check: {e}")
        import traceback
        print(traceback.format_exc())
        raise

@app.get("/api/transactions", response_model=PaginatedResponse, tags=["Transactions"])
async def get_transactions(
    q: Optional[str] = Query(None, description="Full-text search (customer name + phone)"),
    regions: Optional[str] = Query(None, description="Comma-separated regions (e.g. 'East,West')"),
    genders: Optional[str] = Query(None, description="Comma-separated genders (e.g. 'Male,Female')"),
    categories: Optional[str] = Query(None, description="Comma-separated product categories"),
    payment_methods: Optional[str] = Query(None, description="Comma-separated payment methods"),
    order_statuses: Optional[str] = Query(None, description="Comma-separated order statuses"),
    age_min: Optional[int] = Query(None, description="Minimum age"),
    age_max: Optional[int] = Query(None, description="Maximum age"),
    date_from: Optional[str] = Query(None, description="Start date (YYYY-MM-DD)"),
    date_to: Optional[str] = Query(None, description="End date (YYYY-MM-DD)"),
    tags: Optional[str] = Query(None, description="Comma-separated tags"),
    tags_mode: str = Query("any", description="Tag matching mode: 'any' (OR) or 'all' (AND)"),
    sort: str = Query("date", description="Sort by field: date, customer_name, final_amount, age, etc."),
    sort_order: str = Query("DESC", description="Sort order: ASC or DESC"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Records per page"),
):
    """
    Get transactions with filtering, search, sorting, and pagination.
    
    **Examples:**
    - Basic: `/api/transactions`
    - Search: `/api/transactions?q=John`
    - Filter: `/api/transactions?regions=East,West&age_min=20&age_max=50`
    - Combo: `/api/transactions?q=mobile&categories=Electronics&sort=final_amount&sort_order=DESC&page=2`
    """
    try:
        count_query, data_query, params_count, params_data = build_filter_query(
            q=q,
            regions=regions,
            genders=genders,
            categories=categories,
            payment_methods=payment_methods,
            order_statuses=order_statuses,
            age_min=age_min,
            age_max=age_max,
            date_from=date_from,
            date_to=date_to,
            tags=tags,
            tags_mode=tags_mode,
            sort=sort,
            sort_order=sort_order,
            page=page,
            page_size=page_size,
        )
        
        # Get total count
        cursor = db.execute_query(count_query, params_count)
        total = cursor.fetchone()['total']
        cursor.close()
        
        # Get data
        cursor = db.execute_query(data_query, params_data)
        rows = cursor.fetchall()
        cursor.close()
        
        # Convert to response models
        transactions = []
        for row in rows:
            # Convert dict row to TransactionResponse
            tx_dict = dict(row)
            # Convert date objects to strings
            if isinstance(tx_dict.get('date'), __import__('datetime').date):
                tx_dict['date'] = tx_dict['date'].isoformat()
            transactions.append(TransactionResponse(**tx_dict))
        
        total_pages = (total + page_size - 1) // page_size
        
        return PaginatedResponse(
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
            data=transactions
        )
    
    except Exception as e:
        import traceback
        print(f"ERROR in /api/transactions: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/filters", response_model=FilterStats, tags=["Filters"])
async def get_filter_options():
    """Get available filter options (distinct values for dropdowns)"""
    try:
        cursor = db.execute_query("""
            SELECT 
                COUNT(*) as total_records,
                ARRAY_AGG(DISTINCT customer_region ORDER BY customer_region) as regions,
                ARRAY_AGG(DISTINCT gender ORDER BY gender) as genders,
                ARRAY_AGG(DISTINCT product_category ORDER BY product_category) as categories,
                ARRAY_AGG(DISTINCT payment_method ORDER BY payment_method) as payment_methods,
                ARRAY_AGG(DISTINCT order_status ORDER BY order_status) as order_statuses,
                MIN(age) as min_age,
                MAX(age) as max_age,
                MIN(date) as min_date,
                MAX(date) as max_date
            FROM transactions
        """)
        result = cursor.fetchone()
        cursor.close()
        
        return FilterStats(
            total_records=result['total_records'] or 0,
            regions=[r for r in (result['regions'] or []) if r],
            genders=[g for g in (result['genders'] or []) if g],
            categories=[c for c in (result['categories'] or []) if c],
            payment_methods=[pm for pm in (result['payment_methods'] or []) if pm],
            order_statuses=[os for os in (result['order_statuses'] or []) if os],
            age_range={
                'min': result['min_age'],
                'max': result['max_age']
            },
            date_range={
                'min': result['min_date'].isoformat() if result['min_date'] else None,
                'max': result['max_date'].isoformat() if result['max_date'] else None,
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/transactions/{transaction_id}", response_model=TransactionResponse, tags=["Transactions"])
async def get_transaction(transaction_id: str):
    """Get a single transaction by ID"""
    try:
        cursor = db.execute_query(
            "SELECT * FROM transactions WHERE transaction_id = %s LIMIT 1",
            (transaction_id,)
        )
        row = cursor.fetchone()
        cursor.close()
        
        if not row:
            raise HTTPException(status_code=404, detail="Transaction not found")
        
        tx_dict = dict(row)
        # Convert date objects to strings
        if isinstance(tx_dict.get('date'), __import__('datetime').date):
            tx_dict['date'] = tx_dict['date'].isoformat()
        return TransactionResponse(**tx_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stats", tags=["Analytics"])
async def get_statistics():
    """Get basic statistics about transactions"""
    try:
        cursor = db.execute_query("""
            SELECT 
                COUNT(*) as total_transactions,
                COUNT(DISTINCT customer_id) as unique_customers,
                COUNT(DISTINCT product_id) as unique_products,
                ROUND(AVG(final_amount)::numeric, 2) as avg_amount,
                MIN(final_amount) as min_amount,
                MAX(final_amount) as max_amount,
                SUM(quantity) as total_quantity_sold,
                SUM(final_amount) as total_revenue
            FROM transactions
        """)
        result = cursor.fetchone()
        cursor.close()
        return dict(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    try:
        print("[START] Starting TruEstate Backend API...")
        print("[DOCS] API Docs: http://localhost:8080/docs")
        uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info")
    except Exception as e:
        print(f"[ERROR] Failed to start: {e}")
        import traceback
        traceback.print_exc()
