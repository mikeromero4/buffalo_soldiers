import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import {Box,Button,Paper} from "@material-ui/core"
import { Main, Section } from "../components/templates/generic/common"
let url='https://content.surge365.com/Surge-Vortex-Docs/Vortex-Logo_2018.png'
export default (props) => (
  < >
    <SEO title="Page two" />
    <Main margin>
    <Section name = "intro" classes={['-transparent']}>

    <Box  p={6}><Paper><Box p={2}>
    <h1>discount travel</h1>

    Looking for affordable travel for an event or other matter related to the buffallo soldiers 9th and 10th (horse) calvary association?
    get discounted flights, and other travel accommidations using our vertex360 discounts using the link below!
    <a target='_blank' style={{backgroundImage:'url('+url+')',backgroundSize: 'contain',display:'block',height:'150px',width:'550px',margin:'auto'}} href='https://myvortex365.com/AKABuffaloSoldiers'>
      </a>
     </Box> </Paper></Box>
   </Section> </Main>
  </>
)