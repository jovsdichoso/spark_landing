import useReveal from '../useReveal.js'

const STEPS = [
  {
    who: 'Pathologist',
    title: 'Register the patient',
    body: 'Personal information and medical history are entered once, by the clinician who owns the record.',
  },
  {
    who: 'Pathologist + Patient',
    title: 'Facial recognition warm-up',
    body: 'A short warm-up that primes the assessment. It never doubles as a login.',
  },
  {
    who: 'AI',
    title: 'Aphasia level detection',
    body: 'The system analyzes the assessment and classifies severity — mild, moderate, or severe.',
  },
  {
    who: 'Pathologist',
    title: 'Review & assign complexity',
    body: 'The pathologist confirms the result and sets therapy complexity to match it.',
  },
  {
    who: 'Pathologist',
    title: 'Schedule the session',
    body: 'Date, time, duration, and therapy type — set once, visible to the patient immediately.',
  },
  {
    who: 'Patient',
    title: 'Gamified therapy',
    body: 'Interactive activities tuned to the assigned complexity keep sessions engaging.',
  },
  {
    who: 'SPARK',
    title: 'Progress recorded',
    body: 'Scores, completion, duration, and challenges are logged against the patient profile.',
  },
  {
    who: 'Patient',
    title: 'Check the web portal',
    body: 'Records, results, schedule, and progress — open in any browser, nothing to install.',
  },
]

export default function HowItWorks() {
  const [ref, inView] = useReveal()

  return (
    <section className="section" id="how-it-works">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">The full workflow</span>
          <h2>One continuous path, from intake to progress report.</h2>
          <p>
            Every step happens in order, and every step has a clear owner — the pathologist,
            the AI, or the patient. Nothing is left ambiguous about who does what.
          </p>
        </div>

        <div className={`timeline reveal ${inView ? 'in' : ''}`} ref={ref}>
          <div className="timeline-track">
            {STEPS.map((step, i) => (
              <div className="timeline-step" key={step.title}>
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
                <span className="who">{step.who}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
