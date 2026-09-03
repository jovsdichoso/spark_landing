// portal/PortalLogin.jsx

import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import logo from '../assets/Spark_Logo.png'
import { signInPatient } from '../services/portalAuthService'
import { usePortalAuth } from './PortalAuthContext'

export default function PortalLogin() {
  const { user, isInitializing } = usePortalAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isInitializing && user) {
    return <Navigate to="/portal" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)

    const { error: signInError } = await signInPatient(email, password)

    setLoading(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    navigate('/portal', { replace: true })
  }

  return (
    <div className="portal-auth-page">
      <div className="portal-auth-card">
        <a href="/" className="portal-auth-logo">
          <img src={logo} alt="SPARK" />
          SPARK
        </a>

        <span className="eyebrow2 portal-auth-eyebrow">Patient portal</span>
        <h1>Welcome back</h1>
        <p className="portal-auth-sub">
          Sign in with the email and temporary password your Pathologist sent you.
        </p>

        <form onSubmit={handleSubmit} className="portal-form">
          <label className="portal-field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
            />
          </label>

          <label className="portal-field">
            <span>Password</span>
            <div className="portal-password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="portal-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {error && <p className="portal-error">{error}</p>}

          <button type="submit" className="btn btn-primary portal-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="portal-auth-footnote">
          Trouble signing in? Contact the Pathologist who registered your account.
        </p>
      </div>
    </div>
  )
}
