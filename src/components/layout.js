import React from "react"
import { Link } from "gatsby"
import "./layout.scss"
import Menu from "./menu"
const { useState } = React;

const Layout = ({ location, children }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleMobileMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="global-wrapper">

      <header className="global-header">
        <div className="header-content-wrapper">
          <nav className="main-nav">
            <div className="logo-wrapper">
              <Link to="/"><span>G</span><span className="flipped-letter">BLO</span></Link>
            </div>
            <button className={`burger-btn ${(isOpen)?"opened":""}`} onClick={toggleMobileMenu} aria-label="afficher le menu">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </button>
            <div className={`menu-wrapper ${(isOpen)?"opened":""}`}>
              <Menu></Menu>
            </div>
          </nav>
        </div>
      </header>

      <main className="main-wrapper">{children}</main>

      <footer className="global-footer">
        <div className="footer-content-wrapper">
          <div>
            © {new Date().getFullYear()}
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Layout
