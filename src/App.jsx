import { useState } from 'react'
import './App.css'
import Sidebar from '../src/components/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Sidebar></Sidebar>
    </>
  )
}

export default App
