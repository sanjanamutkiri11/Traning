import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>Welcome to Dashboard!</h1>
          <p>You have successfully logged in</p>
        </div>

        <div className="dashboard-content">
          <div className="user-info">
            <p><strong>Username:</strong> {currentUser}</p>
            <p><strong>Status:</strong> <span className="status-active">Authenticated</span></p>
          </div>

          <div className="dashboard-actions">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
