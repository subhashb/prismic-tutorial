import React from "react"
import { graphql } from "gatsby"
import "../css/global.css"

export const pageQuery = graphql`
  query CompetitionQuery {
    competition: prismicCompetition {
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

const Index = ({ data: { competition } }) => {
  const { title, description } = competition.data
  const image = competition.data.hero.fixed.src
  return (
    <React.Fragment>
      <div>{competition.data.uid}</div>
      <div dangerouslySetInnerHTML={{ __html: title.html }} />
      <div
        dangerouslySetInnerHTML={{
          __html: description.html,
        }}
      />
      <img src={image} alt="Dummy" />
    </React.Fragment>
  )
}

export default Index

const french = graphql`
  query filterByLang {
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
