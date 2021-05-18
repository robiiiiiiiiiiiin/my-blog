import { Link } from "gatsby"
import { default as React } from "react"
import {
    Highlight,
    Hits,
    Index,
    PoweredBy,
} from "react-instantsearch-dom"

const PageHit = ({ hit }) => {
    const thumbnail = hit.thumbnail.childImageSharp.fluid
    return (
        <article className="search-hit">
            <Link to={hit.slug}>
                <picture className="thumbnail">
                    <source type="image/webp" srcSet={thumbnail.srcSetWebp} sizes={thumbnail.sizes} />
                    <source type="image/jpeg" srcSet={thumbnail.srcSet} sizes={thumbnail.sizes} />
                    <img src={thumbnail.originalImg} alt="miniature" />
                </picture>
                <div className="title">
                    <Highlight attribute="title" hit={hit} tagName="mark" />
                </div>
            </Link>
        </article>
    )
}

const HitsInIndex = ({ index }) => {
    return (
        <Index indexName={index.name}>
            <Hits className={`${index.name}`} hitComponent={PageHit} />
        </Index>
    )
}

const SearchResult = ({ indices, HitCount, setHitCount }) => (
    <div className="search-results">
        <HitCount setHitCount={setHitCount}/>
        {indices.map(index => (
            <HitsInIndex index={index} key={index.name}/>
        ))}
        <PoweredBy />
    </div>
)

export default SearchResult