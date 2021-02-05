import React from "react"
import { graphql } from "gatsby"
import "./blog-post.scss"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Graphcomment from "../components/graphcomment"
import ShareButtons from "../components/sharebuttons"
import PostInfos from "../components/post-infos"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { title, tags } = post.frontmatter
  const url = location.href;
  const thumbnail = post.frontmatter.thumbnail.childImageSharp.fluid.src

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={thumbnail}
        type="article"
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <PostInfos category={post.frontmatter.tags[0]} date={post.frontmatter.date}></PostInfos>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody" className="article-text"
        />
        <ShareButtons title={title} url={url} tags={tags}/>
        <hr />
      </article>
      <Graphcomment></Graphcomment>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "fr")
        description
        tags
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 400, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
