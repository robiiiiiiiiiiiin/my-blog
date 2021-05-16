import React from "react"
import { Link } from "gatsby"
import "./layout.scss"
import Menu from "./menu"
const { useState } = React;

const Layout = ({ location, children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  const toggleSearch = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  return (
    <div className="global-wrapper">

      <header className="global-header">
        <nav className="main-nav">
          <div className="logo-wrapper">
            <Link to="/"><span>G</span><span className="flipped-letter">BLO</span></Link>
          </div>
          <button className={`toggle-search-btn ${(searchIsOpen) ? "opened" : ""}`} onClick={toggleSearch}>
            <svg className={`search-icon ${(searchIsOpen) ? "hidden" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
            <svg className={`close-icon ${(searchIsOpen) ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
          </button>
          <button className={`burger-btn ${(menuIsOpen) ? "opened" : ""}`} onClick={toggleMobileMenu} aria-label="afficher le menu">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </button>
          <div className={`menu-wrapper ${(menuIsOpen) ? "opened" : ""}`}>
            <Menu></Menu>
          </div>
          <div className={`search-form-wrapper ${(searchIsOpen) ? "opened" : ""}`}>
            <form className="search-form">
              <button className="search-btn" type="submit">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
              </button>
              <input id="search-input" type="search" placeholder="Rechercher"></input>
            </form>
          </div>
        </nav>
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
