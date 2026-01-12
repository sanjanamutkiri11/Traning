import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Check if user is authenticated on mount (from localStorage)
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    const user = localStorage.getItem('currentUser')
    if (auth === 'true' && user) {
      setIsAuthenticated(true)
      setCurrentUser(user)
    }
  }, [])

  const login = (username) => {
    setIsAuthenticated(true)
    setCurrentUser(username)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', username)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
