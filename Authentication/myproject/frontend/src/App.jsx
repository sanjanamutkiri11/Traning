import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Register from './components/Register'
import Login from './components/Login'
import MFA from './components/MFA'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'
import './App.css'

function AppRoutes() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  // Redirect authenticated users away from auth pages
  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />
    }
    return children
  }

  return (
    <Routes>
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login 
              onLoginSuccess={(username) => {
                setCurrentUser(username)
                navigate('/mfa')
              }}
            />
          </PublicRoute>
        } 
      />
      <Route 
        path="/mfa" 
        element={
          currentUser ? (
            <MFA 
              username={currentUser} 
              onSuccess={() => {
                login(currentUser)
                setCurrentUser(null)
                navigate('/dashboard')
              }}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
