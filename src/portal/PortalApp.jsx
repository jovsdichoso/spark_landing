// portal/PortalApp.jsx

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PortalAuthProvider } from './PortalAuthContext'
import RequirePatient from './RequirePatient'
import PortalLogin from './PortalLogin'
import PortalDashboard from './PortalDashboard'
import './portal.css'

export default function PortalApp() {
  return (
    <PortalAuthProvider>
      <Routes>
        <Route path="login" element={<PortalLogin />} />
        <Route
          path="*"
          element={
            <RequirePatient>
              <PortalDashboard />
            </RequirePatient>
          }
        />
      </Routes>
    </PortalAuthProvider>
  )
}
