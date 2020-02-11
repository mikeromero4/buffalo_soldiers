import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import {Box,Button,Paper} from "@material-ui/core"
import { Main, Section } from "../components/templates/generic/common"
import { useMediaQuery } from 'react-responsive'
let url='https://content.surge365.com/Surge-Vortex-Docs/Vortex-Logo_2018.png'

export default () => 
  {
    let small= useMediaQuery(
      {
      query: '(max-width: 680px)'
    })
  return < >
    <SEO title="Page two" />
    <Main margin>
    <Section name = "intro" classes={['-transparent']}>

    <Box  p={small?1:6}><Paper><Box p={small?1:2}>
    <h1>Discount travel</h1>

    Looking for affordable travel for an event or other matter related to the Buffallo Soldiers 9th & 10th (Horse) Calvary Association?
    get discounted flights, and other travel accommidations using our vertex360 discounts using the link below!
    <a target='_blank' 
    href='https://myvortex365.com/AKABuffaloSoldiers'>
      <img src={url}  style={{display:'block',width:'100%',maxWidth:'550px',margin:'auto'}}/>
      </a>
     </Box> </Paper></Box>
   </Section> </Main>
  </>}
