import React from 'react'
import "../style/lightbox.css"
import Gallery from '../components/organisms/gallery/gallery'
import { Main } from "../components/templates/generic/common"
import { Box, Paper,Grid } from "@material-ui/core"

const IndexPage = () => {
    return       <Main margin flush>
    <div className="l-topSection">
       <h2 className = "heading--2 ut-gold heading--special1"> photo gallery</h2>

          </div>
          <Box m = "auto" p = {4} width = "100%">
          <Paper>
              <Gallery/>
              </Paper>
          </Box>
          </Main>
}


export default IndexPage
