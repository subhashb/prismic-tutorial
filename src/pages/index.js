import React from "react"
import { graphql } from "gatsby"
import "../css/global.css"

export const pageQuery = graphql`
  query CompetitionQuery {
    prismicCompetition {
      data {
        title {
          html
        }
        description {
          html
        }
        hero {
          fixed {
            src
          }
        }
      }
    }
  }
`

const Index = ({ data: { prismicCompetition } }) => {
  const { title, description, hero } = prismicCompetition.data
  return (
    <React.Fragment>
      <div>{prismicCompetition.data.uid}</div>
      <div dangerouslySetInnerHTML={{ __html: title.html }} />
      <div
        dangerouslySetInnerHTML={{
          __html: description.html,
        }}
      />
      <img src={hero.fixed.src} alt="Dummy" />
    </React.Fragment>
  )
}

export default Index

const french = graphql`
  {
    allPrismicCompetition(filter: { lang: { eq: "fr-fr" } }) {
      edges {
        node {
          data {
            title {
              html
            }
          }
        }
      }
    }
  }
`
