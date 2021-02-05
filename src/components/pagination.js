import React from "react"
import { Link } from "gatsby"
import "./pagination.scss"

const Pagination = ({location, currentPage, numPages}) => {
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const url = location.pathname.replace(/\/$/, '') // url without last slash if there is one
    const currentLocation = currentPage === 1 ? url : url.substring(0, url.lastIndexOf("/") + 1).replace(/\/$/, '') // url without last element without last slash
    const prevPage = currentPage - 1 === 1 ? currentLocation+'/' : currentLocation+'/'+(currentPage - 1)
    const nextPage = currentLocation+'/'+(currentPage + 1)

    if(numPages >= 8) {
        return (
            <nav role="navigation" aria-label="Pagination Navigation" className="pagination-nav">
                <ul className="items">
                    {!isFirst && (
                        <li><Link to={prevPage} rel="prev" className="big-button">&lt; précédent</Link></li>
                    )}

                    {currentPage >= 3 && ( 
                        <li><Link to={currentLocation} >1</Link></li>
                    )}
                    {currentPage >= 4 && ( <span>...</span> )}

                    {isFirst && ( <>
                        <li><Link to={`${currentLocation}/`} className="current">1</Link></li>
                        <li><Link to={`${currentLocation}/2`} >2</Link></li>
                        <li><Link to={`${currentLocation}/3`} >3</Link></li>
                    </> )}
                    {!isFirst && !isLast && ( <>
                        <li><Link to={`${currentLocation}/${currentPage-1}`} >{currentPage-1}</Link></li>
                        <li><Link to={`${currentLocation}/${currentPage}`} className="current">{currentPage}</Link></li>
                        <li><Link to={`${currentLocation}/${currentPage+1}`} >{currentPage+1}</Link></li>
                    </> )}
                    {isLast && ( <>
                        <li><Link to={`${currentLocation}/${numPages-2}`} >{numPages-2}</Link></li>
                        <li><Link to={`${currentLocation}/${numPages-1}`} >{numPages-1}</Link></li>
                        <li><Link to={`${currentLocation}/${numPages}`} className="current">{numPages}</Link></li>
                    </> )}

                    {currentPage <= (numPages-3) && ( <span>...</span> )}
                    {currentPage <= (numPages-2) && ( 
                        <li><Link to={`${currentLocation}/${numPages}`} >{numPages}</Link></li>
                    )}

                    {!isLast && (
                        <li><Link to={nextPage} rel="next" className="big-button">suivant &gt;</Link></li>
                    )}
                </ul>
            </nav>
        )
    }
    else {
        return (
            <nav role="navigation" aria-label="Pagination Navigation" className="pagination-nav">
                <ul className="items">
                    {!isFirst && (
                        <li><Link to={prevPage} rel="prev" className="big-button">&lt; précédent</Link></li>
                    )}

                    {Array.from({ length: numPages }, (_, i) => (
                        <li key={`pagination-number${i + 1}`} >
                            <Link to={`${currentLocation}/${i === 0 ? "" : i + 1}`} className={(currentPage === i+1) ? "current" : ""}>
                                {i + 1}
                            </Link>
                        </li>
                    ))}

                    {!isLast && (
                        <li><Link to={nextPage} rel="next" className="big-button">suivant &gt;</Link></li>
                    )}
                </ul>
            </nav>
        )
    }

}

export default Pagination