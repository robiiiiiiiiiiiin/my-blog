import React from "react"
import { Link } from "gatsby"

const Menu = () => {
    return (
        <ul className="list">
            <li className="item"><Link to="/">BLOG</Link></li>
            {/* <li className="item"><Link to="/cine">CINÉ</Link></li> */}
            <li className="item"><Link to="/a-propos">À PROPOS</Link></li>
        </ul>
    )
}

export default Menu