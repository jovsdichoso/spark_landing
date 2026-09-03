// portal/sections/AccountSection.jsx

import React, { useState } from 'react'
import { changeOwnPassword } from '../../services/portalAuthService'
import { usePortalAuth } from '../PortalAuthContext'

export default function AccountSection() {
  const { profile } = usePortalAuth()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setLoading(true)
    const { error: changeError } = await changeOwnPassword(currentPassword, newPassword)
    setLoading(false)

    if (changeError) {
      setError(changeError.message)
      return
    }

    setSuccess('Your password has been updated.')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="portal-stack">
      <section className="portal-panel">
        <h3>Account</h3>
        <ul className="portal-kv">
          <li>
            <span>Name</span>
            <strong>{profile?.fullName || '—'}</strong>
          </li>
          <li>
            <span>Email</span>
            <strong>{profile?.email || '—'}</strong>
          </li>
        </ul>
      </section>

      <section className="portal-panel">
        <h3>Change password</h3>
        <p className="portal-muted portal-account-sub">
          If you're still using the temporary password from your welcome email, set a new one now.
        </p>

        <form onSubmit={handleSubmit} className="portal-form portal-form-narrow">
          <label className="portal-field">
            <span>Current password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              disabled={loading}
            />
          </label>

          <label className="portal-field">
            <span>New password</span>
            <input
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              disabled={loading}
            />
          </label>

          <label className="portal-field">
            <span>Confirm new password</span>
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={loading}
            />
          </label>

          {error && <p className="portal-error">{error}</p>}
          {success && <p className="portal-success">{success}</p>}

          <button type="submit" className="btn btn-primary portal-submit" disabled={loading}>
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </section>
    </div>
  )
}
