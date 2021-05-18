import { default as React, useMemo, useState, useEffect } from "react"
import { Link } from "gatsby"
import "./layout.scss"
import Menu from "./menu"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, connectStateResults } from "react-instantsearch-dom"
import SearchBox from "./search-box"
import SearchResult from "./search-result"

const searchIndices = [{ name: `Articles` }]

const Layout = ({ location, children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [showCrossIcon, setShowCrossIcon] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [animation, setAnimation] = useState('');
  const [hitCount, setHitCount] = useState(0);
  const [query, setQuery] = useState();
  const [showSearchResults, setShowSearchResults] = useState(false)

  useEffect(() => {
    setShowSearchResults(query && query.length > 0 && searchIsOpen)
  }, [query, searchIsOpen])

  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  const HitCount = connectStateResults(({ searchResults, setHitCount }) => {
    const hitCount = searchResults && searchResults.nbHits
    setHitCount(hitCount < 1 ? 0.3 : hitCount) /* If no hit, still provide space for no hit message */
    return hitCount > 0 ? (
      <div style={{display: 'none'}}></div>
    ) : (
      <div className="no-result">Aucun résultat pour votre recherche :(</div>
    )
  })

  const toggleMobileMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  const toggleSearch = () => {
    setAnimation( menuIsOpen ? '' : (searchIsOpen ? 'slideUp' : 'slideDown'))
    setTimeout(() => {
      setShowCrossIcon(!showCrossIcon)
    }, (searchIsOpen && !menuIsOpen) ? 990 : 0)
    setSearchIsOpen(!searchIsOpen);
  };

  return (
    <div className="global-wrapper">

      <header className="global-header">
        <nav className="main-nav">
          <div className="logo-wrapper">
            <Link to="/" aria-label="accueil"><span>G</span><span className="flipped-letter">BLO</span></Link>
          </div>
          <button className={`toggle-search-btn ${animation} ${(searchIsOpen) ? "opened" : ""}`} onClick={toggleSearch} aria-label={searchIsOpen ? "Cacher la barre de recherche" : "Afficher la barre de recherche"}>
            <svg className={`search-icon ${(showCrossIcon) ? "hidden" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" /></svg>
            <svg className={`close-icon ${(showCrossIcon) ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" /></svg>
          </button>
          <button className={`burger-btn ${(menuIsOpen) ? "opened" : ""}`} onClick={toggleMobileMenu} aria-label={ menuIsOpen ? "Cacher le menu" : "afficher le menu"}>
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </button>
          <div className={`menu-wrapper ${(menuIsOpen) ? "opened" : ""}`}>
            <Menu></Menu>
          </div>
          <InstantSearch
            searchClient={searchClient}
            indexName={searchIndices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
            <div className={`search-form-wrapper ${(searchIsOpen) ? "opened" : "" } ${(showSearchResults) ? "with-results" : "" }`} style={{'--result-count': showSearchResults ? hitCount : 0}}>

              <SearchBox animation={animation} isOpen={searchIsOpen} />
              { showSearchResults &&
                <SearchResult indices={searchIndices} HitCount={HitCount} setHitCount={setHitCount}/>
              }

            </div>
          </InstantSearch>
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
