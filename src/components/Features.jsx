import useReveal from '../useReveal.js'

const ICONS = {
  brain: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A1418" strokeWidth="1.6">
      <path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-1 5.6V15a3 3 0 0 0 3 3h1v2a2 2 0 0 0 4 0v-2h1a3 3 0 0 0 3-3v-1.4A3 3 0 0 0 16 8V7a3 3 0 0 0-3-3 3 3 0 0 0-2 .8A3 3 0 0 0 9 4Z" strokeLinejoin="round" />
    </svg>
  ),
  scan: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A1418" strokeWidth="1.6">
      <path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M20 8V6a2 2 0 0 0-2-2h-2M20 16v2a2 2 0 0 1-2 2h-2" strokeLinecap="round" />
      <circle cx="9" cy="10" r="1.2" fill="#2A1418" stroke="none" />
      <circle cx="15" cy="10" r="1.2" fill="#2A1418" stroke="none" />
      <path d="M8.5 15c1 1 6 1 7 0" strokeLinecap="round" />
    </svg>
  ),
  controller: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A1418" strokeWidth="1.6">
      <path d="M7 9h.01M5 12h4M7 10v4" strokeLinecap="round" />
      <circle cx="16.5" cy="10.5" r="1" fill="#2A1418" stroke="none" />
      <circle cx="19" cy="13" r="1" fill="#2A1418" stroke="none" />
      <path d="M6 7h12a3 3 0 0 1 3 3.2l-.6 5A2.6 2.6 0 0 1 17.9 17c-.8 0-1.5-.4-2-1l-1-1.3a2 2 0 0 0-1.6-.8h-2.6a2 2 0 0 0-1.6.8L8 16c-.5.6-1.2 1-2 1a2.6 2.6 0 0 1-2.5-1.8l-.6-5A3 3 0 0 1 6 7Z" strokeLinejoin="round" />
    </svg>
  ),
  chart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A1418" strokeWidth="1.6">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  portal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A1418" strokeWidth="1.6">
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
    </svg>
  ),
  dashboard: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A1418" strokeWidth="1.6">
      <rect x="3" y="3" width="8" height="8" rx="1.6" />
      <rect x="13" y="3" width="8" height="5" rx="1.6" />
      <rect x="13" y="10" width="8" height="11" rx="1.6" />
      <rect x="3" y="13" width="8" height="8" rx="1.6" />
    </svg>
  ),
}

const FEATURES = [
  {
    icon: 'brain',
    title: 'AI aphasia level detection',
    body: 'After the assessment, SPARK classifies severity as mild, moderate, or severe against the approved clinical methodology — reviewed and confirmed by the pathologist before anything is assigned.',
  },
  {
    icon: 'scan',
    title: 'Facial recognition warm-up',
    body: "Part of the assessment, not the login. It captures the warm-up activity the pathologist needs, and it stays on the pathologist's side of the system.",
  },
  {
    icon: 'controller',
    title: 'Gamified therapy',
    body: 'Interactive activities scale in difficulty with the assigned therapy complexity, so a session always matches where a patient actually is.',
  },
  {
    icon: 'chart',
    title: 'Progress tracking',
    body: 'Scores, completion percentage, duration, and challenges encountered are recorded automatically after every session, building a real history over time.',
  },
  {
    icon: 'portal',
    title: 'Patient web portal',
    body: 'View-only, on purpose. Patients see their records, results, schedule, and progress from any browser — no mobile app, no separate account setup.',
  },
  {
    icon: 'dashboard',
    title: 'Pathologist dashboard',
    body: 'Total patients, pending assessments, and scheduled sessions at a glance, with full patient management and history underneath.',
  },
]

export default function Features() {
  const [ref, inView] = useReveal()

  return (
    <section className="section section-alt" id="features">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">What's inside</span>
          <h2>Built around the assessment, not bolted on to a generic EHR.</h2>
          <p>
            Six pieces that work together as one workflow — assess, classify, treat, schedule,
            and track — with a clear line between what the clinician controls and what the
            patient can see.
          </p>
        </div>

        <div className={`feature-grid reveal ${inView ? 'in' : ''}`} ref={ref}>
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{ICONS[f.icon]}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
