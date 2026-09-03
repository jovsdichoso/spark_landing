// portal/sections/OverviewSection.jsx

import React from 'react'
import { formatFirestoreDate } from '../../services/portalDataService'

export default function OverviewSection({ record, assessments, sessions, feedback }) {
  const latestAssessment = assessments[0]
  const upcoming = sessions.filter((s) => s.status === 'Scheduled')
  const completed = sessions.filter((s) => s.status === 'Completed')
  const latestFeedback = feedback[0]

  return (
    <div className="portal-stack">
      <div className="portal-card-grid">
        <StatCard label="Aphasia Level" value={record?.aphasiaLevel || 'Not yet assessed'} accent="brand" />
        <StatCard label="Upcoming Sessions" value={upcoming.length} />
        <StatCard label="Completed Sessions" value={completed.length} />
        <StatCard
          label="Latest Assessment Score"
          value={
            latestAssessment ? `${Math.round(latestAssessment.completionPercentage || 0)}%` : '—'
          }
        />
      </div>

      <section className="portal-panel">
        <h3>Therapy plan</h3>
        {record?.therapyType ? (
          <ul className="portal-kv">
            <li>
              <span>Therapy type</span>
              <strong>{record.therapyType}</strong>
            </li>
            <li>
              <span>Complexity</span>
              <strong>{record.therapyComplexity || '—'}</strong>
            </li>
            <li>
              <span>Assigned</span>
              <strong>{formatFirestoreDate(record.therapyAssignedAt)}</strong>
            </li>
          </ul>
        ) : (
          <p className="portal-empty">Your Pathologist hasn't assigned a therapy plan yet.</p>
        )}
      </section>

      <section className="portal-panel">
        <h3>Latest note from your Pathologist</h3>
        {latestFeedback ? (
          <div className="portal-feedback-item">
            <p>{latestFeedback.message}</p>
            <span className="portal-muted">{formatFirestoreDate(latestFeedback.createdAt)}</span>
          </div>
        ) : (
          <p className="portal-empty">No notes yet.</p>
        )}
      </section>
    </div>
  )
}

function StatCard({ label, value, accent }) {
  return (
    <div className={`portal-stat-card${accent ? ` portal-stat-${accent}` : ''}`}>
      <span className="portal-stat-label">{label}</span>
      <span className="portal-stat-value">{value}</span>
    </div>
  )
}
