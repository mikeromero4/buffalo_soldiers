/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
const React = require("react")
const Layout = require("./src/components/templates/generic/layout").default

exports.wrapPageElement = ({ element, props }) => {
  console.log(props)
    let parallax=props.path.includes('fiddlers')
    return <Layout parallax={parallax}{...props}>{element}</Layout>
  }
