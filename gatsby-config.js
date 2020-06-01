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
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `team8site`,
        accessToken: `${process.env.API_KEY}`,
        schemas: {
          competition: require("./src/schemas/competition.json"),
        },
      },
    },
  ],
}
