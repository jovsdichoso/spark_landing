// portal/PortalDashboard.jsx

import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { usePortalAuth } from './PortalAuthContext'
import {
  getPatientRecord,
  listAssessments,
  listTherapySessions,
  listFeedback,
} from '../services/portalDataService'

import PortalLayout from './PortalLayout'
import OverviewSection from './sections/OverviewSection'
import MedicalRecordsSection from './sections/MedicalRecordsSection'
import AssessmentsSection from './sections/AssessmentsSection'
import TherapySection from './sections/TherapySection'
import AccountSection from './sections/AccountSection'

export default function PortalDashboard() {
  const { user } = usePortalAuth()

  const [record, setRecord] = useState(null)
  const [assessments, setAssessments] = useState([])
  const [sessions, setSessions] = useState([])
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadData() {
      if (!user) return

      setLoading(true)
      setError('')

      const [recordRes, assessmentsRes, sessionsRes, feedbackRes] = await Promise.all([
        getPatientRecord(user.uid),
        listAssessments(user.uid),
        listTherapySessions(user.uid),
        listFeedback(user.uid),
      ])

      if (!mounted) return

      if (recordRes.error) {
        setError(recordRes.error.message)
      }

      setRecord(recordRes.data)
      setAssessments(assessmentsRes.data)
      setSessions(sessionsRes.data)
      setFeedback(feedbackRes.data)
      setLoading(false)
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [user])

  if (loading) {
    return (
      <PortalLayout>
        <div className="portal-splash">
          <div className="portal-spinner" />
        </div>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout>
      {error && <p className="portal-error portal-page-error">{error}</p>}

      <Routes>
        <Route
          index
          element={
            <OverviewSection record={record} assessments={assessments} sessions={sessions} feedback={feedback} />
          }
        />
        <Route path="medical-records" element={<MedicalRecordsSection record={record} />} />
        <Route path="assessments" element={<AssessmentsSection assessments={assessments} />} />
        <Route path="therapy" element={<TherapySection sessions={sessions} />} />
        <Route path="account" element={<AccountSection />} />
      </Routes>
    </PortalLayout>
  )
}
