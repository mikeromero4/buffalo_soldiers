import React from 'react'
import "../style/lightbox.css"
import Gallery from '../components/organisms/gallery/gallery'
import { Main } from "../components/templates/generic/common"
import { Box, Paper,Grid } from "@material-ui/core"

const IndexPage = () => {
    return  <Main margin flush>
    <div className="l-topSection">
    <h2 className = "heading--2 ut-gold heading--special1"> Junior Buffalo soldiers</h2>
          </div>
<Box p = {4}><Paper><Box p = {4}>
          <img width = {400} style = {{float:"right",marginLeft:"12px"}} src = "https://i0.wp.com/www.910hcav.org/wp-content/uploads/2018/09/Denver-JR-BS-2.jpg?resize=600%2C399&ssl=1"/>
          <h2>Educating our Youth to Continue to Keep the Legacy Alive!</h2>
          <p>
              Jr. Buffalo Soldiers believes that the Buffalo Soldiers have truly given us “A Glorious Past, and Blazed a Brilliant Future” with their “Fierce Fighting Spirits”and the ultimate sacrifice of their lives that we can forever be proud of.
Our Association is dedicated to the education our youth about their proud heritage. Started by the Denver Chapter in 2008 under the Direction of National Association CO-Founder, Past National President and Original Buffalo Soldier Trooper Turl Covington, and supported by:
</p>
<p>
Original Buffalo Soldier and Past National President Trooper Harold Cole and Past National President Trooper Derrick Davis. Trooper Davis was instrumental in the Denver Chapters being the first Jr. Buffalo Soldiers National Color Guard to present the colors at the National Association Anniversary Reunions.
Since their inception many of our Association Chapters now have Jr. Buffalo Soldier units. We are proud of our Jr. Buffalo Soldiers Units and they are often showcased at many event across the country.
 </p>    
 <hr/>
 <span style = {{textAlign:"center",display:"inherit"}}>
 We are pleased to announce the 1st Jr. Buffalo Soldier Youth Summit:
<br/>National Buffalo Soldier Museum, Houston , TX
<br/>October 11th – 13th, 2019
<br/>Theme: OUR FUTURE VISITS OUR PAST
<br/>with “Original Buffalo Soldier” Trooper Henri Legendre
<br/>For Information <a style = {{textDecoration:"underline",fontWeight:"bold"}} href = "https://www.910hcav.org/buffalo-soldiers-corp/jr-buffalo-soldiers/youth-summit/">click HERE</a>
</span> </Box> </Paper> </Box>
          </Main>
}


export default IndexPage
