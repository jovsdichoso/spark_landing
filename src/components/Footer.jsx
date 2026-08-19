import logo from '../assets/Spark_Logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="nav-logo" href="#top">
              <img className="nav-mark" src={logo} alt="SPARK" />
              SPARK
            </a>
            <p className="footer-tagline">Speech &amp; Aphasia Rehabilitation</p>
            <p>
              Assessment · Recovery · Knowledge — a hospital-based system for pathologists to
              assess, treat, and track aphasia recovery, with a view-only web portal for
              patients.
            </p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h5>Product</h5>
              <ul>
                <li><a href="#how-it-works">Workflow</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#portals">Portals</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>For clinics</h5>
              <ul>
                <li><a href="#get-started">Get started</a></li>
                <li><a href="#story">In the clinic</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Portals</h5>
              <ul>
                <li><a href="#portals">Pathologist login</a></li>
                <li><a href="#portals">Patient login</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SPARK. Built for hospital care teams.</span>
          <span>Web-based · No patient app required</span>
        </div>
      </div>
    </footer>
  )
}
