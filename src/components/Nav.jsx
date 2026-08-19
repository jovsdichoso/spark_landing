import logo from '../assets/Spark_Logo.png'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#top">
          <img className="nav-mark" src={logo} alt="SPARK" />
          SPARK
        </a>

        <nav aria-label="Primary">
          <ul className="nav-links">
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#portals">Two portals</a></li>
            <li><a href="#story">In the clinic</a></li>
          </ul>
        </nav>

        <div className="nav-cta">
          <a href="#portals" className="btn btn-ghost btn-sm">Patient portal</a>
          <a href="#get-started" className="btn btn-primary btn-sm">Get started</a>
        </div>
      </div>
    </header>
  )
}
