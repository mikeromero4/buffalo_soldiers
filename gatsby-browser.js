/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Layout from "./src/components/templates/generic/layout";

const ReactDOM = require("react-dom")
const React = require("react")
const Layout = require("./src/components/templates/generic/layout").default
exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  const currentPosition = getSavedScrollPosition(location)
  const queriedPosition = getSavedScrollPosition({ pathname: `/random` })
console.log(location)
  window.scrollTo(0,0)

  return [0,0]
}
exports.replaceHydrateFunction=() =>{
  return (element, container, callback) => {
      ReactDOM.render(element, container, callback)
  }
}
exports.wrapPageElement = ({ element, props }) => {
  console.log(props)
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    // let parallax=props.path.includes('fiddlers')
    return <Layout {...props}>{element}</Layout>
    // return <Layout parallax={parallax}{...props}>{element}</Layout>

  }
// You can delete this file if you're not using it
