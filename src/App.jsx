import React, { useState, useEffect } from 'react'
import AuthSystem from './components/AuthSystem'
import MainContent from './components/MainContent'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="app">
      <AuthSystem onAuth={() => setIsAuthenticated(true)} />
      {isAuthenticated && <MainContent />}
    </div>
  )
}

export default App
