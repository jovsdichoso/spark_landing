// portal/PortalLayout.jsx

import React from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import logo from '../assets/Spark_Logo.png'
import { usePortalAuth } from './PortalAuthContext'
import { signOutPatient } from '../services/portalAuthService'

const TABS = [
  { to: '/portal', end: true, label: 'Overview' },
  { to: '/portal/medical-records', label: 'Medical Records' },
  { to: '/portal/assessments', label: 'Assessments' },
  { to: '/portal/therapy', label: 'Therapy Sessions' },
  { to: '/portal/account', label: 'Account' },
]

export default function PortalLayout({ children }) {
  const { profile } = usePortalAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isFirstLogin = searchParams.get('welcome') === '1'

  const handleSignOut = async () => {
    await signOutPatient()
    navigate('/portal/login', { replace: true })
  }

  return (
    <div className="portal-shell">
      <header className="portal-topbar">
        <div className="wrap portal-topbar-inner">
          <a href="/" className="portal-auth-logo portal-topbar-logo">
            <img src={logo} alt="SPARK" />
            SPARK
          </a>

          <div className="portal-topbar-right">
            <span className="portal-topbar-name">{profile?.fullName || profile?.email}</span>
            <button className="btn btn-ghost btn-sm" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>

        <nav className="portal-tabs wrap" aria-label="Patient portal">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) => `portal-tab${isActive ? ' active' : ''}`}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="wrap portal-main">
        {isFirstLogin && (
          <div className="portal-banner">
            Welcome! You're signed in with a temporary password — we recommend{' '}
            <NavLink to="/portal/account">setting a new one</NavLink> now.
          </div>
        )}

        {children}
      </main>
    </div>
  )
}
