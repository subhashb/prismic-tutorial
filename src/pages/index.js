import React, { useEffect, useRef } from "react"
import "../css/global.css"
import styled from "styled-components"
import { graphql } from "gatsby"
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

const Index = props => {
  const limit = 2
  const didMountRef = useRef(false)
  const [data, setData] = React.useState(props.data.prismic)

  useEffect(props => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    props.prismic
      .load({
        variables: { limit: limit },
        getTours,
        fragments: [],
      })
      .then(res => {
        console.log(res)
        setData(res.data)
      })
  }, [])
  return (
    <Wrapper>
      <div className="container">
        {data.allCompetitions.edges.map(({ node }, index) => {
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
