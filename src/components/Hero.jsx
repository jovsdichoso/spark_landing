import WordScramble from './WordScramble.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-scramble">
            <WordScramble text="RIGHT WORD, RIGHT TIME" />
          </div>

          <h1>
            Aphasia care that follows the patient from first assessment to first full sentence.
          </h1>

          <p className="hero-sub">
            SPARK gives pathologists one place to assess, treat, and schedule aphasia therapy —
            and gives patients a simple web portal to watch their own progress. No app to
            install, no login to remember for the clinic.
          </p>

          <div className="hero-ctas">
            <a href="#get-started" className="btn btn-primary">Start a pathologist account</a>
            <a href="#portals" className="btn btn-ghost">See the patient portal</a>
          </div>

          <p className="hero-note">Runs in the browser · Works on hospital-issued tablets and desktops</p>

          <div className="hero-stats">
            <div className="hero-stat">
              <b>3</b>
              <span>Aphasia levels tracked</span>
            </div>
            <div className="hero-stat">
              <b>9</b>
              <span>Steps, start to progress report</span>
            </div>
            <div className="hero-stat">
              <b>0</b>
              <span>Apps a patient has to download</span>
            </div>
          </div>
        </div>

        <div className="phone-stage">
          <div className="phone-glow" aria-hidden="true" />
          <div className="phone">
            <div className="phone-notch" aria-hidden="true" />
            <div className="phone-screen">
              <div className="phone-topbar phone-topbar-light">
                <div className="who">Pathologist dashboard</div>
                <h4>Good morning, Dr. Santos</h4>
              </div>
              <div className="phone-body">
                <div className="phone-card phone-card-brand">
                  <div className="label light">Total patients</div>
                  <div className="value light">32</div>
                  <span className="pill pill-light">View all</span>
                </div>

                <div className="phone-row">
                  <div className="phone-card phone-card-tint">
                    <div className="label">Pending</div>
                    <div className="value">5</div>
                  </div>
                  <div className="phone-card phone-card-tint">
                    <div className="label">Today's sessions</div>
                    <div className="value">8</div>
                  </div>
                </div>

                <div className="phone-card">
                  <div className="label">Recent patient</div>
                  <div className="value">Juan Dela Cruz</div>
                  <span className="pill">Moderate aphasia</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
