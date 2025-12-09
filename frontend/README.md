# TruEstate Frontend

A modern React + TypeScript frontend for the TruEstate Sales Management System.

## Features

- 📊 Transaction dashboard with filtering
- 🔍 Search and advanced filtering
- 📄 Pagination support
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI with Lucide React icons
- ⚡ Built with Vite for fast development

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── Sidebar.tsx   # Navigation sidebar
│   ├── Header.tsx    # Top header bar
│   ├── FilterBar.tsx # Advanced filtering
│   ├── TransactionTable.tsx # Data table
│   └── Pagination.tsx # Pagination controls
├── pages/           # Page components
│   └── Dashboard.tsx # Main dashboard page
├── services/        # API integration
│   └── api.ts       # Axios API client
├── types/          # TypeScript types
│   └── index.ts    # Type definitions
├── App.tsx         # Root component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Build

```bash
npm run build
```

## API Configuration

The frontend is configured to proxy API requests to `http://localhost:8080/api`. Make sure your backend is running on this port.

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client
