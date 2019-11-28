
import React from "react"
import PropTypes from "prop-types"
import {CssBaseline} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import './layout.css'
import theme from './theme'
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children,path }) => {

  return (
    <ThemeProvider theme={theme}><>
    <CssBaseline />
    <div style = {{
      background:'#cfb77b',
      //backgroundImage:"url('https://www.parksconservancy.org/sites/default/files/styles/basic/public/9thcavalryatpresidio_0.jpg?itok=bzxGr2bY')",
      display:"flex",
      flexDirection:"column",
      minHeight:"100vh"
    }}>
      <Header path = {path}siteTitle='buffalo soldiers association' />
     
        <main style = {{flexGrow:1}}>{children}</main>
        
<Footer/>
      </div></>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
