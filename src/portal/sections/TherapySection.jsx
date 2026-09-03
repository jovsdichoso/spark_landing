// portal/sections/TherapySection.jsx

import React from 'react'

export default function TherapySection({ sessions }) {
  if (!sessions.length) {
    return <p className="portal-empty">No therapy sessions have been scheduled yet.</p>
  }

  return (
    <div className="portal-stack">
      {sessions.map((session) => (
        <section key={session.id} className="portal-panel portal-session-card">
          <div className="portal-session-head">
            <div>
              <strong>{session.therapyType || 'Therapy Session'}</strong>
              <div className="portal-muted">
                {session.date} {session.time ? `· ${session.time}` : ''}
              </div>
            </div>
            <span className={`portal-status portal-status-${(session.status || '').toLowerCase()}`}>
              {session.status || 'Scheduled'}
            </span>
          </div>

          <ul className="portal-kv">
            <li>
              <span>Complexity</span>
              <strong>{session.therapyComplexity || '—'}</strong>
            </li>
            <li>
              <span>Duration</span>
              <strong>{session.durationMinutes ? `${session.durationMinutes} min` : '—'}</strong>
            </li>
            {session.status === 'Completed' && (
              <li>
                <span>Score</span>
                <strong>
                  {session.score !== undefined ? `${session.score}%` : '—'}
                  {session.correctCount !== undefined && session.totalCount
                    ? ` (${session.correctCount}/${session.totalCount})`
                    : ''}
                </strong>
              </li>
            )}
          </ul>

          {session.notes && <p className="portal-session-notes">{session.notes}</p>}
        </section>
      ))}
    </div>
  )
}
