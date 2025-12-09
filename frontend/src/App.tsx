import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      
      <div className="main-content w-full">
        <Header 
          title="Sales Management System"
        />
        
        {activeMenu === 'dashboard' && <Dashboard />}
        {activeMenu !== 'dashboard' && (
          <div className="content flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Page for {activeMenu} coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
