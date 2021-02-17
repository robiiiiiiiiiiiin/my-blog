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
        <p>Hello, moi c'est Robin, 22 ans, en dernière année d'HES en ingénierie des médias et amateur de web et de tech.</p>
        <p>J'ai créé ce blog principalement pour moi-même. Écrire des articles de blog me pousse à creuser certains sujets en profondeur et à aller au bout de mes recherches et expérimentations. Mais évidemment, je serais ravi de pouvoir apprendre des choses à mes lecteurs et d'échanger avec vous!</p>
        <p>J'aimerais aussi écrire certains articles un peu plus détentes pour parler de sujets divers. Que ce soit des recommandations d'oeuvres diverses ou des réflexions peu adaptées à mes autres réseaux sociaux.</p>
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
