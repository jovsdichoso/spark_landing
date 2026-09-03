// portal/sections/AssessmentsSection.jsx

import React from 'react'
import { formatFirestoreDate } from '../../services/portalDataService'

export default function AssessmentsSection({ assessments }) {
  if (!assessments.length) {
    return <p className="portal-empty">No assessments have been recorded yet.</p>
  }

  return (
    <div className="portal-stack">
      {assessments.map((assessment) => (
        <section key={assessment.id} className="portal-panel portal-assessment-card">
          <div className="portal-assessment-head">
            <span className="portal-muted">{formatFirestoreDate(assessment.createdAt)}</span>
            <span className="pill">{Math.round(assessment.completionPercentage || 0)}% complete</span>
          </div>

          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${Math.min(100, Math.round(assessment.completionPercentage || 0))}%` }}
            />
          </div>

          <ul className="portal-kv">
            <li>
              <span>Duration</span>
              <strong>{formatDuration(assessment.durationSeconds)}</strong>
            </li>
            <li>
              <span>Challenges attempted</span>
              <strong>{assessment.challenges?.length ?? 0}</strong>
            </li>
          </ul>
        </section>
      ))}
    </div>
  )
}

function formatDuration(seconds) {
  const total = Number(seconds || 0)
  const minutes = Math.floor(total / 60)
  const remaining = total % 60
  if (!minutes) return `${remaining}s`
  return `${minutes}m ${remaining}s`
}
