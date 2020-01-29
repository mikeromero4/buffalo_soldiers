import React, { Component } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
function getGeo() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
          console.log(position)
          reverseGEO.bind(this)({
            lat:position.coords.latitude,
            lng:position.coords.longitude
          })
    this.props.setOrigin({
      lat:position.coords.latitude+Math.random()*.002,
      lng:position.coords.longitude
     })
      }.bind(this),function(){    alert("please allow access to your location in your browser")    });
    }    
}

async function reverseGEO({lat,lng}) {
  console.log(lat)

  console.log(lng)
  let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
  let key = "AIzaSyBi8HYhLfAHJ1SebXf7Bz2Q05h0L8ho-Vg"
  let url2 = `${url}${lat},${lng}&key=${key}`
  let d = fetch(url2)
  let p = await d
  let v = await (await p).json()
  console.log(v)
  if (v.results.length == 0) {
    return
  }
  console.log(v.results[0])
  //"administrative_area_level_1" "postal_code" "locality"

  function find(name){
    return v.results[0].address_components.find((e)=>{
      return e.types.indexOf(name)!=-1
    })
  }
  
  let value = ""
  let index 
    index = find("locality")
        if (index){
           value+=  index.long_name + ", "
        }
    index = find("administrative_area_level_1")
        if (index){
            value+= index.long_name
          }
          if(value=='') {
     index = find('postal_code')
          if (index){
            value+= "zip code " + index.short_name
          }
        }
        if(value=='') {value='your location'}

        console.log(value)
  
  
  this.props.setLocation(value)
}
async function getLocation(location) {
  let url = "https://maps.googleapis.com/maps/api/geocode/json?"
  let key = "AIzaSyBi8HYhLfAHJ1SebXf7Bz2Q05h0L8ho-Vg"
  let url2 = `${url}address=${location}&key=${key}`
  let d = fetch(url2)
  let p = await d
  let v = await (await p).json()
  if (v.results.length !== 1) {
    return
  }
  let result = v.results[0].geometry.location
  console.log(v.results[0])
  //"administrative_area_level_1" "postal_code" "locality"

  function find(name){
    return v.results[0].address_components.find((e)=>{
      return e.types.indexOf(name)!=-1
    })
  }
    
  let value = ""
  let index 
    index = find("locality")
        if (index){
           value+=  index.long_name + ", "
        }
    index = find("administrative_area_level_1")
        if (index){
            value+= index.long_name
          }
          if(value=='') {
     index = find('postal_code')
          if (index){
            value+= "zip code " + index.short_name
          }
        }
        if(value=='') {value=location}

        console.log(value)
  
  
  this.props.setLocation(value)
  this.props.setOrigin(result)
}

export default class test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getLocation = getLocation.bind(this)
  }

  render() {
    return (
      <>
      <br/>   

      <div>
        <input
          onKeyPress={e => {
            if (e.key == "Enter") {
              this.getLocation(this.state.input)
            }
          }}
          onChange={e => {
            console.log(e.target.value)
            this.setState({ input: e.target.value })
          }}
          color = "secondary"
          id="outlined-basic"
          label="Enter State or ZIP code"
        />
        <Button color='secondary' variant='contained'
          onClick={() => {
            this.getLocation(this.state.input)
          }}
        >
          find
        </Button>
      </div>

<span style = {{margin:"10px",display:"inline-block"}}>- or -</span>
<br/> 
    <Button onClick = {getGeo.bind(this)} color = "secondary" variant="contained">Use your device's location</Button><br/>
    </>
    )
  }
}
