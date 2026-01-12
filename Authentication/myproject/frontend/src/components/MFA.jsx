import React, { useState, useEffect } from 'react'
import { verifyOTP } from '../services/api'
import './Auth.css'

const MFA = ({ username, onSuccess }) => {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setOtp(value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (otp.length !== 4) {
      setError('Please enter a 4-digit OTP')
      setLoading(false)
      return
    }

    if (timeLeft === 0) {
      setError('OTP has expired. Please login again.')
      setLoading(false)
      return
    }

    try {
      const response = await verifyOTP(username, otp)
      if (response.success) {
        onSuccess()
      } else {
        setError(response.message || 'Invalid OTP')
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Two-Factor Authentication</h1>
          <p>Enter the 4-digit code from the alert</p>
        </div>

        <div className="mfa-info">
          <p className="mfa-username">Verifying: <strong>{username}</strong></p>
          <p className="mfa-timer">Time remaining: <strong>{formatTime(timeLeft)}</strong></p>
          <p className="mfa-hint">Please enter the 4-digit OTP shown in the alert</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
              placeholder="0000"
              maxLength="4"
              className="otp-input"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading || timeLeft === 0}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        {timeLeft === 0 && (
          <div className="auth-footer">
            <p className="expired-message">OTP expired. Please login again.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MFA
