import React from "react"
import { Link } from "gatsby"
import "./category.scss"
const _ = require("lodash")

const Category = ({category}) => {
    const normalizedCategory = _.lowerCase(category).replace(/\s+/g, '')

    return (
        <Link to={"/categorie/"+normalizedCategory} className="category-wrapper" itemProp="url">
            <div className="category">{category}&nbsp;</div>
            <div className={normalizedCategory+" bullet"}></div>
        </Link>
    )

}

export default Category