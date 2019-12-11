import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';

import { Autocomplete } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./style.scss"

let states = [
"Alabama",
"Alaska",
"Arizona",
"Arkansas",
"California",
"Colorado",
"Connecticut",
"Delaware",
"District Of Columbia",
"Florida",
"Georgia",
"Hawaii",
"Idaho",
"Illinois",
"Indiana",
"Iowa",
"Kansas",
"Kentucky",
"Louisiana",
"Maine",
"Maryland",
"Massachusetts",
"Michigan",
// "Minnesota",
// "Mississippi",
// "Missouri",
// "Montana",
// "Nebraska",
// "Nevada",
// "New Hampshire",
// "New Jersey",
// "New Mexico",
// "New York",
// "North Carolina",
// "North Dakota",
// "Ohio",
// "Oklahoma",
// "Oregon",
// "Pennsylvania",
// "Rhode Island",
// "South Carolina",
// "South Dakota",
// "Tennessee",
// "Texas",
// "Utah",
// "Vermont",
// "Virginia",
// "Washington",
// "West Virginia",
// "Wisconsin",
// "Wyoming"
]
function randomChapters() {
    let list = []
    let amount = Math.ceil(Math.random()*3)
    for (let i=0;i<amount;i++) {
        list.push(
            "Chapter " + i
        )
    }
    return list
}
let chapters=[]
states=states.map((e)=>{
    let state={
        state:e,
        chapters:randomChapters()
    }
    chapters = [...chapters,...state.chapters.map((e2)=>({
        chapter:e2,
        state:e
    }))]
    return state
})
console.log(chapters)

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,locationDisabled);
      }    
}
function locationDisabled() {
    alert("please allow access to your location in your browser")
}
  function showPosition(position) {
    //   alert(position.coords.latitude)

    //   alert(position.coords.longitude)
    console.log("test")
      console.log(position)
  }
export default(data)=>{
    const theme = useTheme();

console.log(theme.palette.primary)

    return<>
    {/* <div >
        
     <Carousel>
                <div>
                    <img src="http://realhistoryww.com/world_history/ancient/Misc/Buffalo_soldiers/Indian_96.JPG" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="http://www.roc55.com/wp-content/uploads/2018/02/Buffalo-soldiers-three-guys-20171201_150356.png" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://media-cdn.tripadvisor.com/media/photo-s/0b/91/f3/8c/buffalo-soldier-monument.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    </div> */}
<Box bgcolor={theme.palette.primary.main} display = "flex" p={4} flexDirection = "row" alignItems = "center" justifyContent='space-around'>
    <Box width='600px' mr={2} textAlign="center">
    <h1>Find your local chapter</h1>

        <p style={{marginBottom:'24px'}}>The National Association is comprised of many Chartered Chapters all across the United States.
             Use one of the options below to find the nearest chapter.

</p>
    <Button onClick = {getLocation} color = "secondary" variant="contained">Use your device's location</Button><br/>
    <span style = {{margin:"10px",display:"inline-block"}}>- or -</span>
    <br/>
    <TextField  color='secondary' id="outlined-basic" label="Enter State or ZIP code" variant="outlined" />
<br/><br/>
    
    {/* <div className='chapters'>
    {states.map(e=><div className='chapters__list'>
        <h1 className='chapters__title'>{e.state}</h1>
        <ul >
            {e.chapters.map((e)=><li>{e}</li>)}
        </ul>
    </div>)} */}
    </Box>
    <div>
        <img style = {{display:"inline-block"}} height = {300} src='https://cdn.vox-cdn.com/thumbor/XqNT8JWd35IO5mBDoULgXOKVliI=/0x0:755x567/1200x800/filters:focal(317x223:437x343)/cdn.vox-cdn.com/uploads/chorus_image/image/63699378/google-att-fiber1.0.1535614345.0.png'/>
</div>
    </Box>
    <Box textAlign = "center" m = {2} p = {2}>
<Paper elevation = {4}>            <p>Please enter your location above.</p></Paper>
</Box>
    <Box bgcolor={theme.palette.primary.main} p={4} justifyContent = "center" alignItems = "center" display = "flex" flexDirection = "row" mt = "20">
    <span>Can't find a local chapter?</span>
   
<Autocomplete
    options = {chapters}
    groupBy = {function(e){return e.state}}
    id="grouped-demo"
  getOptionLabel={option => option.chapter}
  style={{width:"300px"}}
  renderInput={params => (
    <TextField color='secondary'  {...params} label="Browse all chapters" theme='light'
     variant="outlined" fullWidth />
    
  )}
    />
   <span  style = {{margin:"10px",display:"inline-block"}}> or</span>  <Link color = "secondary"> Find out how to start one in your community</Link> 
    </Box>
    </>}