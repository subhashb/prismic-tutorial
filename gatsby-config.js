/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: `team8site`,
        defaultLang: "en-us",
        accessToken: `${process.env.API_KEY}`,
        path: "/preview",
        previews: true,
        pages: [
          {
            type: "Competition",
            match: "/competition/:uid", // pages will be generated under this pattern
            previewPath: "/competition", // optional path for unpublished documents
            component: require.resolve("./src/templates/competition.js"),
          },
        ],
      },
    },
  ],
}
