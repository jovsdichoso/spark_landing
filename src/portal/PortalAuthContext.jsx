// portal/PortalAuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react'
import { subscribeToPortalAuthChanges, getPatientProfile } from '../services/portalAuthService'

const PortalAuthContext = createContext({
  user: null,
  profile: null,
  isInitializing: true,
  refreshProfile: async () => {},
})

export function PortalAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  const loadProfile = async (currentUser) => {
    if (!currentUser) {
      setProfile(null)
      return
    }

    const { data } = await getPatientProfile(currentUser.uid)
    setProfile(data)
  }

  useEffect(() => {
    let mounted = true

    const unsubscribe = subscribeToPortalAuthChanges(async (currentUser) => {
      if (!mounted) return

      setUser(currentUser)

      if (currentUser) {
        await loadProfile(currentUser)
      } else {
        setProfile(null)
      }

      if (mounted) setIsInitializing(false)
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  const refreshProfile = async () => {
    if (user) await loadProfile(user)
  }

  const value = { user, profile, isInitializing, refreshProfile }

  return <PortalAuthContext.Provider value={value}>{children}</PortalAuthContext.Provider>
}

export function usePortalAuth() {
  return useContext(PortalAuthContext)
}
