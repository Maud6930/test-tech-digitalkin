import { useState } from 'react'

import './App.css'
import Kinslist from './kinslist'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <h1>Liste des kins</h1>
        <Kinslist /> 
      </div>
      
  )
}

export default App
