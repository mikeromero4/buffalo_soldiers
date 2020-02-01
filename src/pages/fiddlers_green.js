import React from "react"
import { Link } from "gatsby"
import SEO from "../components/utilities/seo"
import { height } from "@material-ui/system"
//https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/cowboy-and-horse-1357-12601-300x300.png
//https://www.pinclipart.com/picdir/big/180-1805729_transparent-horses-cowboy-clipart-freeuse-download-cowboy-on.png
import grass from "../images/grass.png"
import image from '../images/fiddlers-green.jpg'
import { Box, Button,Paper,Checkbox, TextField } from "@material-ui/core"


export default props => (
  <>
    <SEO title="Page two" />
    <span className="fiddlersGreenTitle">Fiddlers Green</span>
    <div className="p__holder" style={{}}>
      <div className="p2">
        <div style={{
            backgroundImage: `url(${image})`,
          }}/>
      </div>
      <div style={{position:'relative'}}>
      <div className="p1">
        <div
          style={{
            backgroundSize:'60%',
            backgroundImage: `url(${grass})`,
          }}
          className="pi1"
        >
          
        </div>
        </div>
        <div className='poem'>

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

      <div>
 <Box p={10}>
<Paper>
<Box p={4}>
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
</Box>

</Paper>

 </Box>
      </div>
      </div>
    </div>
  </>
)
