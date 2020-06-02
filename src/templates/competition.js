import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import styled from "styled-components"
import Img from "gatsby-image"

export const query = graphql`
  query($uid: String!) {
    prismic {
      competition(uid: $uid, lang: "en-us") {
        title
        description
        image1
        image1Sharp {
          childImageSharp {
            fluid(maxWidth: 550, maxHeight: 775) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        awards {
          name
          criteria
        }
      }
    }
  }
`

const Competition = response => {
  console.log(response)
  const data = response.data
  const { title, description, awards } = data.prismic.competition
  const sharpImage = data.prismic.competition.image1Sharp.childImageSharp.fluid
  return (
    <Wrapper>
      <div className="container">
        {RichText.render(title)}
        <div className="row">
          <div>
            <Img fluid={sharpImage} />
          </div>
          <div className="description">{RichText.render(description)}</div>
        </div>
        <div className="awards-row">
          <h2>Award Categories</h2>
          <div className="awards">
            {awards.map((item, index) => {
              return (
                <div className="award">
                  <div>{RichText.render(item.name)}</div>
                  <br />
                  <div>{RichText.render(item.criteria)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
  }
  .row {
    padding: 2em 0;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  h1,
  h2 {
    margin: 1.75rem 0 0;
    padding-bottom: 1em;
  }
  h1 {
    font-size: 3.375rem;
  }
  .description {
    padding: 0 2em;
  }
  img {
    margin: 2em;
  }
  .awards {
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 3rem;
  }
  .award {
    margin: 2rem;
    padding: 1.5rem;
    width: 264px;
    background-image: linear-gradient(53deg, #392b70 2%, #785bc0 98%);
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .awards-row {
    width: 100%;
  }
`

export default Competition
