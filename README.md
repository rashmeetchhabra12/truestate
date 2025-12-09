# TruEstate Sales Management System

A full-stack application for managing sales transactions with a React frontend and Python FastAPI backend.

## Features

- **Transaction Management**: View and search all sales transactions
- **Advanced Filtering**: Filter by region, gender, age, category, payment method, order status, and more
- **Search**: Full-text search on customer names and phone numbers
- **Sorting**: Click column headers to sort data in ascending or descending order
- **Pagination**: Navigate through large datasets efficiently
- **Real-time Data**: Connected to PostgreSQL database via Supabase

## Tech Stack

### Frontend
- React 18.2 + TypeScript
- Vite 5.4.21
- Tailwind CSS 3.3.6
- Axios for HTTP requests

### Backend
- Python 3.x
- FastAPI
- PostgreSQL (Supabase)
- Uvicorn ASGI server

## Project Structure

```
TrueStateAssignment/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx
│   └── package.json
├── backend_python/          # FastAPI application
│   ├── main.py             # Main application file
│   ├── run.py              # Application runner
│   └── requirements.txt
├── truestate_assignment_dataset.csv  # Sample data
└── .venv/                  # Python virtual environment
```

## Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows PowerShell
```

2. Install dependencies:
```bash
cd backend_python
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
# Create .env file in project root
DATABASE_URL=your_supabase_connection_string
```

4. Run the server:
```bash
python run.py
```
The API will be available at `http://localhost:8080`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Set up environment variables:
```bash
# Create .env file in frontend directory
VITE_API_BASE_URL=http://localhost:8080/api
```

3. Run development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3001`

## API Endpoints

- `GET /api/transactions` - Get paginated transactions with filtering and sorting
- `GET /api/transactions/{id}` - Get a specific transaction
- `GET /api/filters` - Get available filter options
- `GET /api/stats` - Get transaction statistics

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open http://localhost:3001 in your browser
4. Use the search bar to find transactions by customer name or phone
5. Use filter dropdowns to narrow results
6. Click column headers to sort data
7. Use pagination to navigate results

## Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend Deployment (Heroku/Railway/Render)
```bash
pip install -r requirements.txt
gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend_python.main:app
```

## Environment Variables

### Backend
- `DATABASE_URL`: PostgreSQL connection string (Supabase)

### Frontend
- `VITE_API_BASE_URL`: Backend API base URL

## Database Schema

The application uses a `transactions` table with the following key columns:
- `transaction_id`: Unique transaction identifier
- `date`: Transaction date
- `customer_id`, `customer_name`, `phone_number`: Customer information
- `gender`, `age`, `customer_region`, `customer_type`: Demographics
- `product_id`, `product_name`, `brand`, `product_category`: Product information
- `tags`: Product tags
- `quantity`, `price_per_unit`, `discount_percentage`: Transaction details
- `total_amount`, `final_amount`: Financial information
- `payment_method`, `order_status`, `delivery_type`: Order information

## Development

### Frontend Development
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend Development
- Run with hot reload: `pip install uvicorn[standard]` then `uvicorn main:app --reload`

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is private and for internal use only.
