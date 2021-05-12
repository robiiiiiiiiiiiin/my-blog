import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import PostInfos from "./post-infos"

const ArticleThumb = ({ post }) => {
    const title = post.frontmatter.title || post.fields.slug
    const thumbnail = post.frontmatter.thumbnail.childImageSharp.fluid

    return (
        <article className="article-card">
            <Link to={post.fields.slug}>
                <Image className="thumbnail" fluid={thumbnail} />
                <h3 className="title">{title}</h3>
            </Link>
            <PostInfos category={post.frontmatter.tags[0]} date={post.frontmatter.date}></PostInfos>
            <p className="description"
                dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                }}
            />
        </article>
    )

}

export default ArticleThumb