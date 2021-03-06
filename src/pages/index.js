import React from "react"
import "../css/global.css"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const getTours = graphql`
  query Competitions {
    prismic {
      allCompetitions {
        edges {
          node {
            title
            entry_opens_on
            _meta {
              uid
            }
          }
        }
      }
    }
  }
`

const Index = ({ data }) => {
  const response = useStaticQuery(getTours)
  const competitions = response.prismic.allCompetitions.edges

  return (
    <Wrapper>
      <div className="container">
        {competitions.map(({ node }, index) => {
          return (
            <AniLink
              key={index}
              fade
              to={`/competition/${node._meta.uid}`}
              className="btn"
            >
              {RichText.render(node.title)}
            </AniLink>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn {
    text-align: center;
    border-radius: 10px;
    width: 500px;
    margin: 2em;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: white;
    border: 2px solid white;
    padding: 0.9rem 1.6rem;
    display: inline-block;
  }
`

export default Index
