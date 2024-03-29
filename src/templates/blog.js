import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Category from "../components/category"
import Pagination from "../components/pagination"
import SEO from "../components/seo"
import ArticleCard from "../components/article-card"

import "./blog.scss"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.posts.nodes
  const categories = data.categories.group
  const { tag, currentPage, numPages } = pageContext
  const h1Title = (tag.length <= 1) ? tag[0] : "Tous les articles"

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <SEO title={h1Title} />
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
      <SEO title={h1Title} type="website" />
      <h1>{h1Title.toUpperCase()}</h1>
      <section className="main-content">
        <div className="articles">
          <ol className="list">
            {posts.map(post => {

              return (
                <li className="item" key={post.fields.slug}>
                  <ArticleCard post={post}></ArticleCard>
                </li>
              )
            })}
          </ol>
          
          <Pagination location={location} currentPage={currentPage} numPages={numPages}></Pagination>

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
  query ($tag: [String], $skip: Int!, $limit: Int!){
    site {
      siteMetadata {
        title
      }
    }
    posts: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: $tag } } }
            limit: $limit
            skip: $skip
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
