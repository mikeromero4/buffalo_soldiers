import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import { height } from "@material-ui/system"
//https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/cowboy-and-horse-1357-12601-300x300.png
//https://www.pinclipart.com/picdir/big/180-1805729_transparent-horses-cowboy-clipart-freeuse-download-cowboy-on.png
import grass from "../images/grass.png"
import image from '../images/fiddlersGreen.jpg'
import { Box, Button,Paper,Checkbox, TextField } from "@material-ui/core"
import { Main } from "../components/templates/generic/common"
import { Parallax, Background } from 'react-parallax';



export default props => (
    <Main margin flush>
          <div className="l-topSection">
            <div className="l-topSection__seperation">
              <p className="o-donations__note -t">
                </p>
            </div>
          </div>
           
          <div style={{display:'flex',flexDirection:"row-reverse",background: '#0a2f55'}}>
<div style = {{
  alignSelf: "center",
  flexBasis: "10px",
  flexGrow: 1,
}}>
      <img style={{width:'100%'}} src={image}/>
</div>
   <div style = {{
  flexBasis: "10px",
}} className='poem'>
    <h2 className="heading--2 ut-gold heading--special1">Fiddlers Green</h2>
 
        <p>
          When a cavalryman dies, he begins a long march to his ultimate
          destination. About halfway along the road, he enters a broad meadow
          dotted with trees and crossed by many streams, known as “Fiddler’s
          Green.”
        </p>
        <p>
          As he crosses the green, he finds an old canteen, a single spur, and a
          carbine sling. Traveling along, he comes upon a field camp where he
          finds all the troopers who have gone before him, with their campfires,
          tents, and picket lines neatly laid out.
        </p>
        <p>
          All other branches of service must continue to march without pause.
          The cavalrymen, though, are authorized to dismount, unsaddle, and stay
          in the Fiddler’s Green, their canteens ever full, the grass always
          green, and enjoy the companionship and reminiscences of old friends.
        </p>
        </div>
          </div>

      <div>
 <Box p={4}>
 
<Paper>
<Box p={4}>
  
                  <div style={{display:'flex',flexDirection:"row",background: '#0a2f55'}}>

  
  <Parallax
            blur={1}
            bgImage={"https://cdn.shopify.com/s/files/1/0992/8352/products/20171113_122224_2048x.jpg?v=1510597747"}
            bgImageAlt="the cat"
            strength={400}
        >
            Put some text content here - even an empty div with fixed dimensions to have a height
            for the parallax.
            <div style={{ height: '400px' }} />
        </Parallax>
<div>
<h1>Fiddlers green form</h1>

<form>

Your name: <TextField/>

E-mail: <TextField/>
<br/><br/>

Deceased name: <TextField/>

Chapter name: <TextField/>

<br/><br/>Association affiliation:

<br/><Checkbox
  value="Original Buffalo Soldier"
  />Original Buffalo Soldier
<br/>  <Checkbox
  value='Association Member '
  />Association Member 
<br/>  <Checkbox
  value='Family Member of an Association Member '
  />Family Member of an Association Member 
</form>
<Button variant='underlined' color='secondary'>
  submit
</Button>
</div>
</div>
</Box>

</Paper>

 </Box>

    </div>
  </Main>
)
