export default function Portals() {
  return (
    <section className="section" id="portals">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Two portals, one record</span>
          <h2>The pathologist runs SPARK. The patient watches their own progress.</h2>
          <p>
            Everything a patient sees traces back to something a pathologist entered or
            confirmed. The portal is deliberately view-only — clarity for the patient, control
            for the clinician.
          </p>
        </div>

        <div className="portals">
          <div className="portal-card path">
            <span className="eyebrow2">Main system</span>
            <h3>Pathologist Portal</h3>
            <p className="desc">
              Register patients, run assessments, review AI results, assign therapy, and
              schedule sessions.
            </p>
            <ul className="portal-list">
              <li><span className="dot" />Create and manage a professional account</li>
              <li><span className="dot" />Register patients and enter medical records</li>
              <li><span className="dot" />Run the facial recognition warm-up</li>
              <li><span className="dot" />Review AI-determined aphasia level</li>
              <li><span className="dot" />Assign therapy complexity and schedule sessions</li>
              <li><span className="dot" />Monitor progress across every patient</li>
            </ul>
          </div>

          <div className="portal-card patient">
            <span className="eyebrow2">View-only</span>
            <h3>Patient Web Portal</h3>
            <p className="desc">
              A simplified web portal patients get to after their pathologist creates their
              account — no download required.
            </p>
            <ul className="portal-list">
              <li><span className="dot" />View personal information and medical records</li>
              <li><span className="dot" />View aphasia assessment results and level</li>
              <li><span className="dot" />View upcoming and completed therapy sessions</li>
              <li><span className="dot" />View overall progress and performance</li>
              <li><span className="dot" />Cannot edit records, assign therapy, or schedule</li>
              <li><span className="dot" />No facial recognition, no assessment tools</li>
            </ul>
            <a href="/portal/login" className="btn btn-primary btn-sm portal-card-cta">
              Sign in to Patient Portal
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
