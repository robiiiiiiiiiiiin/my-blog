const escapeStringRegexp = require("escape-string-regexp")
const pagePath = `content/blog`
const indexName = `Articles`
const pageQuery = `{
  articles: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          description
          date
          tags
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 200, quality: 90) {
                sizes
                srcSet
                srcSetWebp
                originalImg
              }
            }
          }
        }
        internal {
          content
        }
      }
    }
  }
}`
function pageToAlgoliaRecord({ node: { id, frontmatter, fields, internal } }) {
    return {
        objectID: id,
        ...frontmatter,
        ...fields,
        ...internal,
    }
}
const queries = [
    {
        query: pageQuery,
        transformer: ({ data }) => data.articles.edges.map(pageToAlgoliaRecord),
        indexName,
        /* settings: { attributesToSnippet: [`excerpt:20`] }, */
    },
]
module.exports = queries