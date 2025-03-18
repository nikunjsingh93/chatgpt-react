import { useState } from 'react'
import './App.css'
import Sidebar from '../src/components/Sidebar'
import MainContent from '../src/components/MainContent'

function App() {
  const [count, setCount] = useState(0)

  return (
   
    <div className="flex h-screen">
      <Sidebar />
      <MainContent />
    </div>
  
    
  )
}

export default App
