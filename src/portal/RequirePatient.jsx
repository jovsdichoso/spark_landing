// portal/RequirePatient.jsx

import React from 'react'
import { Navigate } from 'react-router-dom'
import { usePortalAuth } from './PortalAuthContext'

export default function RequirePatient({ children }) {
  const { user, isInitializing } = usePortalAuth()

  if (isInitializing) {
    return (
      <div className="portal-splash">
        <div className="portal-spinner" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/portal/login" replace />
  }

  return children
}
