import React, { Component } from 'react';
import { fitBounds } from 'google-map-react/utils';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Carousel} from  "react-responsive-carousel"
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Map from "./map"
import { Autocomplete } from '@material-ui/lab';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.scss"


import { withTheme } from '@material-ui/core/styles';


let coords=[
    {
        lat:34,
        lng:-117,
        name:"San Diego",
        address:"18723 fake Avenue, San Diego, ca",
    },
    {
        lat:39,
        lng:-97
    },
    {
        lat:37,
        lng:-105
    },
    {
        lat:36,
        lng:-86
    },
    {
        lat:33,
        lng:-111
    },
    {
        lat:41,
        lng:-87
    },
    {
        lat:38,
        lng:-120
    },
    {
        lat:36,
        lng:-92
    }
]



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

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition.bind(this),locationDisabled);
      }    
}
function locationDisabled() {
    alert("please allow access to your location in your browser")
}
  function showPosition(position) {
    //   alert(position.coords.latitude)
console.log(position)
    //   alert(position.coords.longitude)
      this.getBounds({
        lat:position.coords.latitude+Math.random()*.002,
        lng:position.coords.longitude

       })
  }



class Comp extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    getBounds(coordinates){
        let{lat,lng}=coordinates
        let k1,k2
        let{lat:lat2,lng:lng2}=coords[6]
        if(lat>lat2){
            if(lng>lng2){
                k1='nw'
                k2='se'
            }
            else{
                k1='ne'
                k2='sw'
            }
        }
        else{
            if(lng>lng2){
                k1='sw'
                k2='ne'
            }
            else{
                k2='nw'
                k1='se'
            }
        }
        const bounds = {
            
            [k1]: {
              lat: lat2,
              lng: lng2
            },
            [k2]: {
              lat: lat,
              lng: lng
            }
          };
          
          const size = {
            width: 650, // Map width in pixels
            height: 430, // Map height in pixels
          };
          
          const {center, zoom} = fitBounds(bounds, size);
          this.setState({
              zoom:zoom,
              coords:{
            lat:center.lat,
            lng:center.lng,
    
           }})
    }
    componentDidMount(){
       // getLocation.bind(this)()
       //here
        let component = this
        let promise = fetch("http://api.ipstack.com/check?access_key=0329a849fe2abda0869327aa61232634")
        promise.then((e)=>{e.json().then((e)=>{
              component.setState({
                  city:e.city,
                  state:e.region_code,
                  })
       component.getBounds({
        lat:e.latitude+Math.random()*.002,
        lng:e.longitude

       })
            
            })
        })
    }
    render() {

        const {theme} = this.props;
        return<>
        <div>
        
        {/* <Carousel>
                    <div>
                        <img style={{height:'500px',width:'800px'}}src="http://realhistoryww.com/world_history/ancient/Misc/Buffalo_soldiers/Indian_96.JPG" />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img style={{height:'500px',width:'800px'}}src="http://www.roc55.com/wp-content/uploads/2018/02/Buffalo-soldiers-three-guys-20171201_150356.png" />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img style={{height:'500px',width:'800px'}}src="https://media-cdn.tripadvisor.com/media/photo-s/0b/91/f3/8c/buffalo-soldier-monument.jpg" />
                        <p className="legend">Legend 3</p>
                    </div>
                </Carousel> */}
         
    </div>               <Box bgcolor={theme.palette.primary.main} display = "flex" p={4} flexDirection = "row" alignItems = "center" justifyContent='space-around'>
        <Box width='600px' mr={2} textAlign="center">
        <h1>Find your local chapter</h1>
    
            <p style={{marginBottom:'24px'}}>The National Association is comprised of many Chartered Chapters all across the United States.
                 Use one of the options below to find the nearest chapter.
    
    </p>
        <Button onClick = {getLocation.bind(this)} color = "secondary" variant="contained">Use your device's location</Button><br/>
        <span style = {{margin:"10px",display:"inline-block"}}>- or -</span>
        <br/>
        <TextField  color='secondary' id="outlined-basic" label="Enter State or ZIP code" variant="outlined" />
        </Box>
        <Box height = {450} width = {650}>
                    <Map zoom = {this.state.zoom} coords={this.state.coords}/>
    </Box>
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
        </>
    }
}
export default withTheme(Comp)

//         {/* <div >
            
//          <Carousel>
//                     <div>
//                         <img src="http://realhistoryww.com/world_history/ancient/Misc/Buffalo_soldiers/Indian_96.JPG" />
//                         <p className="legend">Legend 1</p>
//                     </div>
//                     <div>
//                         <img src="http://www.roc55.com/wp-content/uploads/2018/02/Buffalo-soldiers-three-guys-20171201_150356.png" />
//                         <p className="legend">Legend 2</p>
//                     </div>
//                     <div>
//                         <img src="https://media-cdn.tripadvisor.com/media/photo-s/0b/91/f3/8c/buffalo-soldier-monument.jpg" />
//                         <p className="legend">Legend 3</p>
//                     </div>
//                 </Carousel>
//         </div> */}
            
//         <Box color='    #0a2f55' display = "flex" p={4} flexDirection = "row-reverse" alignItems = "center" justifyContent='space-around'>
//         <Box width='600px' mx={4} textAlign="left">

          

//         {/* <Button onClick = {getLocation.bind(this)} color = "secondary" variant="contained">Use your device's location</Button><br/>
//         <span style = {{margin:"10px",display:"inline-block"}}>- or -</span> */}
//         <div style={{width:'650px',height:'500px'}}>
      
//             <Map zoom = {this.state.zoom} coords={this.state.coords}/>
//             </div>
        
//         </Box>
//         <Box mx={4} flexGrow={1} alignSelf='stretch'>
//         <h3>Find your local chapter</h3>

// <p style={{fontSize:'20px',margin:'1px'}}>The National Association is comprised of many Chartered Chapters all across the United States.
// </p>

    
//         <TextField fullWidth color='secondary' id="outlined-basic" label="Search City State or ZIP code" variant="outlined" />
//     <p style={{fontSize:'20px'}}>Chapters in <span style={{color:'yellow'}}>{this.state.state}:</span> </p>

//             {/* <img style = {{display:"inline-block"}} height = {300} src='https://cdn.vox-cdn.com/thumbor/XqNT8JWd35IO5mBDoULgXOKVliI=/0x0:755x567/1200x800/filters:focal(317x223:437x343)/cdn.vox-cdn.com/uploads/chorus_image/image/63699378/google-att-fiber1.0.1535614345.0.png'/> */}
//  </Box>
//         </Box>
     
//         <Box  p={4} justifyContent = "center" alignItems = "center" display = "flex" flexDirection = "row" mt = "20">
//         <span>Can't find a local chapter?</span>
       
//     <Autocomplete
//         options = {chapters}
//         groupBy = {function(e){return e.state}}
//         id="grouped-demo"
//       getOptionLabel={option => option.chapter}
//       style={{width:"300px"}}
//       renderInput={params => (
//         <TextField color='secondary'  {...params} label="Browse all chapters" theme='light'
//          variant="outlined" fullWidth />
        
//       )}
//         />
//        <span  style = {{margin:"10px",display:"inline-block"}}> or</span>  <Link color = "secondary"> Find out how to start one in your community</Link> 
//         </Box>