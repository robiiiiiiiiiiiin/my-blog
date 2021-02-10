import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./a-propos.scss"

const APropos = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="À propos" />
      <section className="a-propos">
        <h1>À propos</h1>
        <p>Yo, moi c'est Robin, étudiant en ingénierie des médias, amateur de web, de tech, de ciné et de tulipes.</p>
        <p>J'ai créé ce blog d'une part pour moi, pour me pousser à creuser des sujets et à aller au bout des choses. Et si en plus mes articles t'intéressent, je serais le plus heureux des hommes.</p>
        <p>Hésite pas à lacher un commentaire!</p>
      </section>
    </Layout>
  )
}

export default APropos

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
