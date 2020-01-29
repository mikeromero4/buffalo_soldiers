import React from "react"
import { Link } from "gatsby"
import Chapters from "../components/organisms/chapters/index"
import Layout from "../components/templates/generic/layout"
import SEO from "../components/utilities/seo"
import { Main } from "../components/templates/generic/common"

const SecondPage = (props) => (
  <>
    <SEO title="Page two" />
  <Main margin>

    <Chapters/>
  </Main>
  </>
)

export default SecondPage
