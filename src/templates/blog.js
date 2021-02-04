import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Category from "../components/category"
import SEO from "../components/seo"
import Image from "gatsby-image"

import "./blog.scss"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.posts.nodes
  const categories = data.categories.group
  const { tag } = pageContext
  const h1Title = tag ? tag[0] : "Tous les articles"

  console.log(h1Title)

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <h1>{h1Title.toUpperCase()}</h1>
      <section className="main-content">
        <div className="articles">
          <ol className="list">
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug
              const thumbnail = post.frontmatter.thumbnail.childImageSharp.fluid

              return (
                <li className="item" key={post.fields.slug}>
                  <article className="article" itemScope >
                    <Link to={post.fields.slug} itemProp="url">
                      <Image className="thumbnail" fluid={thumbnail} />
                      <h3 className="title">{title}</h3>
                    </Link>
                    <div className="infos-wrapper">
                      <Category category={post.frontmatter.tags[0]}></Category>
                      <div className="date">&nbsp;-&nbsp;&nbsp;{post.frontmatter.date}</div>
                    </div>
                    <p className="description"
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
        <aside className="side-content">
            <div className="categories-wrapper">
              <h2 className="title">CATÉGORIES</h2>
              <ul className="category-list">
                {categories.map(category => {

                  return (
                    <li className="item" key={category.tag}>
                      <Category category={category.tag}></Category>
                    </li>
                  )
                })}
                <li className="item">
                  <Link to="/" className="category-wrapper" itemProp="url">
                      <div className="category">Tous&nbsp;</div>
                      <div className="all bullet"></div>
                  </Link>
                </li>
              </ul>
            </div>
        </aside>
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($tag: [String]){
    site {
      siteMetadata {
        title
      }
    }
    posts: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: $tag } } }
        ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM YYYY", locale: "fr")
          title
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
    }
    categories: allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
