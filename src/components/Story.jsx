const MOMENTS = [
  {
    title: 'Patient arrives',
    body: 'A patient visits the hospital needing aphasia assessment and therapy.',
  },
  {
    title: 'Account created in minutes',
    body: 'The pathologist logs in, adds the patient, and enters personal and medical details.',
  },
  {
    title: 'Assessment, start to finish',
    body: 'Facial recognition warm-up, AI-assisted analysis, and a confirmed aphasia level — in one sitting.',
  },
  {
    title: 'Therapy assigned and booked',
    body: 'Complexity is set to match the result, and the first session goes on the calendar.',
  },
  {
    title: 'Patient checks the portal',
    body: 'From their phone or a home computer, they see the result, the schedule, and what to expect.',
  },
]

export default function Story() {
  return (
    <section className="section section-alt" id="story">
      <div className="wrap story">
        <div>
          <span className="eyebrow">In the clinic</span>
          <h2 style={{ marginTop: 16, fontSize: 'clamp(28px, 3vw, 36px)' }}>
            A first visit, from intake to first look at the portal.
          </h2>
          <div className="story-steps" style={{ marginTop: 32 }}>
            {MOMENTS.map((m) => (
              <div className="story-step" key={m.title}>
                <div>
                  <h4>{m.title}</h4>
                  <p>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quote-card">
          <blockquote>
            "The record used to live in three different places. Now the assessment, the
            schedule, and the progress notes are the same record my patient sees at home —
            I just decide what's ready to show them."
          </blockquote>
          <div className="attrib">— A speech-language pathologist, on early SPARK use</div>
        </div>
      </div>
    </section>
  )
}
