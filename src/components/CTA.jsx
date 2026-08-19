export default function CTA() {
  return (
    <section className="section-tight" id="get-started">
      <div className="wrap">
        <div className="cta-band">
          <div>
            <span className="eyebrow" style={{ color: '#FDECC8' }}>Ready when your clinic is</span>
            <h2>Set up SPARK for your first patient today.</h2>
            <p>
              Pathologists create their own account and can register a patient the same day.
              Patients get portal access the moment their record exists — nothing to install.
            </p>
          </div>
          <div className="cta-actions">
            <a href="#top" className="btn btn-primary">Create a pathologist account</a>
            <a
              href="https://github.com/jovsdichoso/SPARK/releases/download/V1/SPARK.apk"
              className="btn btn-download"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 3v12m0 0-4-4m4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download the app (APK)
            </a>
            <a href="#portals" className="btn btn-ghost">Preview the patient portal</a>
            <span className="cta-note">Android APK · direct download from GitHub Releases</span>
          </div>
        </div>
      </div>
    </section>
  )
}
