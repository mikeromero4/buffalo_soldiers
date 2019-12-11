import React from "react"
import { Link } from "gatsby"
import Chapters from "../components/organisms/chapters/index"
import Layout from "../components/templates/generic/layout"
import SEO from "../components/utilities/seo"

const SecondPage = (props) => (
  <>
    <SEO title="Page two" />
  
    <Chapters/>
  </>
)

export default SecondPage
