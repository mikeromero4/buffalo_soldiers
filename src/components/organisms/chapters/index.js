import React, { Component } from "react"
import { fitBounds } from "google-map-react/utils"
import Paper from "@material-ui/core/Paper"
import Table from "./table"
import Box from "@material-ui/core/Box"
import Map from "./map"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./style.scss"
import { withTheme } from "@material-ui/core/styles"
import data2 from "./results.json"
import Dialogue from "./dialogue"
import LocationInput from "./locationInput"
let mapW=400,mapH=550
let data = data2.map(e => {
  let { lng, lat } = e.geocoding.geometry.location
  return {
    lat,
    lng,
    ...e,
  }
})

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { locations: data, moved: 0, open: false }
    this.setOrigin = this.setOrigin.bind(this)

    this.setLocation = this.setLocation.bind(this)
    this.handleClickOpen = value => {
      this.setState({ open: true })
      this.setState({ clicked: value })
    }

    this.handleClose = () => {
      this.setState({ open: false })
    }
  }

  getDistance({ lat, lng }) {
    let coords = data
      .map(e => {
        return {
          ...e,
          d: calculateDistance(
            { longitude: lng, latitude: lat },
            { longitude: e.lng, latitude: e.lat }
          ),
        }
      })
      .sort((a, b) => a.d - b.d)
    return coords
  }
  setLocation(location) {
    this.setState({
      city: location,
    })
  }
  setOrigin(coordinates) {
    let { lat, lng } = coordinates
    let locations = this.getDistance(coordinates)
    let { lat: lat2, lng: lng2 } = locations[0]
    let k1, k2
    if (lat > lat2) {
      if (lng > lng2) {
        k1 = "nw"
        k2 = "se"
      } else {
        k1 = "ne"
        k2 = "sw"
      }
    } else {
      if (lng > lng2) {
        k1 = "sw"
        k2 = "ne"
      } else {
        k2 = "nw"
        k1 = "se"
      }
    }
    const bounds = {
      [k1]: {
        lat: lat2,
        lng: lng2,
      },
      [k2]: {
        lat: lat,
        lng: lng,
      },
    }

    const size = {
      width: mapW, // Map width in pixels
      height: mapH, // Map height in pixels
    }

    const { center, zoom } = fitBounds(bounds, size)
    this.setState({
      zoom: zoom - 1,
      locations,
      coords: {
        lat: center.lat,
        lng: center.lng,
      },
    })
    //   this.update({
    //     zoom:zoom-1,
    //       coords:{
    //     lat:center.lat,
    //     lng:center.lng,
    //    }})
    //   this.setState({
    //       locations,
    //      })
  }
  componentDidMount() {
    let component = this
    // https://ipapi.co/47.152.57.188/json/ 
    // let promise = fetch(
    //   "https://api.ipstack.com/check?access_key=0329a849fe2abda0869327aa61232634"
    // )
    // promise.then(e => {
    //   e.json().then(e => {
    //     console.log(e.city)
    //     component.setLocation(e.city)

    //     component.setOrigin({
    //       lat: e.latitude + Math.random() * 0.002,
    //       lng: e.longitude,
    //     })
    //   })
    // })
        component.setLocation('Fontana, CA')

        component.setOrigin({
          lat: 34.092232+ Math.random() * 0.002,
          lng: -117.435051,
        })
  }
  // _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
  //     this.props.onCenterChange(center);
  //     this.props.onZoomChange(zoom);
  //   }
  //   _onChildClick = (key, childProps) => {
  //     this.props.onCenterChange([childProps.lat, childProps.lng]);
  //   }
  componentWillMount() {
    console.log("index mount")
  }
  render() {
    console.log(this.state.open)
    const { theme } = this.props
    return (
      <>
        <Dialogue
          location={this.state.locations[this.state.clicked]}
          open={this.state.open}
          onClose={this.handleClose}
        />
        <Box
          bgcolor={theme.palette.primary.main}
          display="flex"
          flexWrap='wrap-reverse'

          mx={4}
          p={4}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Box           flexGrow={1}
          flexBasis={350}
            textAlign="center">
            <h1>Find your local chapter</h1>

            <p style={{ marginBottom: "24px" }}>
              <br />
              <br />
              <h3> Currently showing results near {this.state.city}.</h3>
              Search for other chapters below:
            </p>
            <LocationInput
              setOrigin={this.setOrigin}
              setLocation={this.setLocation}
            />
          </Box>
          <Box     
          flexGrow={1}
          flexBasis={400}
          height={mapW} width={mapH}>
            {this.state.coords ? (
              <Map
                onCenterChange={c => {
                  this.setState({ coords: c })
                }}
                onZoomChange={z => {
                  this.setState({ zoom: z })
                }}
                handleClickOpen={this.handleClickOpen}
                locations={this.state.locations}
                zoom={this.state.zoom}
                center={this.state.coords}
              />
            ) : (
              <div
                style={{
                  background: "#0a2f55",
                  color: "white",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                loading map...
              </div>
            )}
          </Box>
        </Box>
        <Box textAlign="center" m={2} p={2}>
          <Paper elevation={4}>
            <Table
              handleClickOpen={this.handleClickOpen}
              location={this.state.city}
              data={this.state.locations}
            />
          </Paper>
        </Box>
        {/* <Box bgcolor={theme.palette.primary.main} p={4} justifyContent = "center" alignItems = "center" display = "flex" flexDirection = "row" mt = "20">
        <span>Can't find a local chapter?</span>
       
    <Autocomplete
        //options = {chapters}
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
        </Box> */}
      </>
    )
  }
}
// let Tt = controllable(Comp, ['center', 'zoom', 'hoverKey', 'clickKey']);

export default withTheme(Comp)

function calculateDistance(pointA, pointB) {
  const lat1 = pointA.latitude
  const lon1 = pointA.longitude

  const lat2 = pointB.latitude
  const lon2 = pointB.longitude

  const R = 3958.8 // earth radius in miles
  const φ1 = lat1 * (Math.PI / 180)
  const φ2 = lat2 * (Math.PI / 180)
  const Δφ = (lat2 - lat1) * (Math.PI / 180)
  const Δλ = (lon2 - lon1) * (Math.PI / 180)

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2))

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c
  return distance // in miles
}
