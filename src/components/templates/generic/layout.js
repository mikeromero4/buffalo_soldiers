
import React from "react"
import PropTypes from "prop-types"
import {CssBaseline} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../../theme'
import Header from "./header"
import Footer from "./footer"
import "./layout.scss"
import SEO from "../../utilities/seo"

const Layout = ({ children,path }) => {
//dont forget to add page name
  return (<><SEO title="Page name" /> 
    <ThemeProvider theme={theme}><>
    <CssBaseline />
    <div className = "parallax">
    <div className = "page" >
      <Header path = {path}siteTitle='buffalo soldiers association' />
      <div className = "mainContent"  style={{position:'relative'}}>

        <main style = {{flexGrow:1}}>{children}</main>
        </div>
<Footer/>
      </div></div></>
    </ThemeProvider></>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
