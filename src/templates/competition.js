import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

export const query = graphql`
  {
    prismic {
      competition(uid: "australia-national-competition", lang: "en-us") {
        title
        description
      }
    }
  }
`

const Competition = ({ data }) => {
  const { title, description } = data.prismic.competition
  console.log(title)
  return <div>{RichText.render(title)}</div>
}

export default Competition
