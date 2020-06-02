import React from "react"
import "../css/global.css"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import { RichText, Date as ParseDate } from "prismic-reactjs"

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
            <Link to={`/competition/${node._meta.uid}`}>
              <div className="btn" key={index}>
                {RichText.render(node.title)}
              </div>
            </Link>
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
    transition: all 0.3s linear;
    cursor: pointer;
  }
`

export default Index
