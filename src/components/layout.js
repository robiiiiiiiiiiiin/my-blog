import React from "react"
import { Link } from "gatsby"
import "./layout.scss"

const Layout = ({ location, children }) => {

  return (
    <div className="global-wrapper">
      <header className="global-header">
        <div className="header-content-wrapper">
          <div className="logo-wrapper">
            <Link to="/"><span>G</span><span className="flipped-letter">BLO</span></Link>
          </div>
          <nav className="main-nav">
            <ul className="list">
              <li className="item"><Link to="/">BLOG</Link></li>
              <li className="item"><Link to="/cine">CINÉ</Link></li>
              <li className="item"><Link to="/a-propos">À PROPOS</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-wrapper">{children}</main>
      <footer className="global-footer">
        <div className="footer-content-wrapper">
          <div>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
