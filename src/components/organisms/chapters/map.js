import React, { Component,ReactDOM } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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

function Markers({ lat, lng }) {
  coords = coords
    .map((e, i) => {
      return {
        ...e,
        i: i,
        d: calculateDistance(
          { longitude: e.lng, latitude: e.lat },
          { longitude: lng, latitude: lat }
        ),
      }
    })
    .sort((a, b) => a.d - b.d)
  return coords.map((e, i) => (
    <AnyReactComponent lat={e.lat} lng={e.lng} distance={e.d} />
  ))
}

const AnyReactComponent = ({ text }) => (
  <div className="marker">
    <LocationOnIcon />
    {text}
  </div>
)

export default class Map extends Component {

  static defaultProps = {
    center: {
      lat: 33 + 13 / 2,
      lng: -76 - 40 / 2,
    },
    zoom: 3.6,
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map" style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBi8HYhLfAHJ1SebXf7Bz2Q05h0L8ho-Vg" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.props.coords || this.props.center}
          coords={this.props.coords || this.props.center}
          zoom={(this.props.zoom || 10) + Math.random() * 0.002}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        
        >
          {Markers(this.props.coords || this.props.center)}
        </GoogleMapReact>
        <input id = "autocomplete"/>
        <SearchBox/>
      </div>
    )
  }
}
function calculateDistance(pointA, pointB) {
  const lat1 = pointA.latitude
  const lon1 = pointA.longitude

  const lat2 = pointB.latitude
  const lon2 = pointB.longitude

  const R = 6371e3 // earth radius in meters
  const φ1 = lat1 * (Math.PI / 180)
  const φ2 = lat2 * (Math.PI / 180)
  const Δφ = (lat2 - lat1) * (Math.PI / 180)
  const Δλ = (lon2 - lon1) * (Math.PI / 180)

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2))

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c
  return distance // in meters
}
function handleApiLoaded(map, maps){
     console.log(maps)
//       var autocomplete= new maps.places.Autocomplete(
//       document.getElementById('autocomplete'), {types: ['geocode']});

//   // Avoid paying for data that you don't need by restricting the set of
//   // place fields that are returned to just the address components.
//   autocomplete.setFields(['address_component']);

//   // When the user selects an address from the drop-down, populate the
//   // address fields in the form.
//   autocomplete.addListener('place_changed', fillInAddress);
}
function fillInAddress(e) {
console.log(e)
}

 class SearchBox extends React.Component {
    // static propTypes = {
    //   placeholder: React.PropTypes.string,
    //   onPlacesChanged: React.PropTypes.func
    // }
    render() {
      return <input ref="input" {...this.props} type="text"/>;
    }
    // onPlacesChanged = () => {
    //   if (this.props.onPlacesChanged) {
    //     this.props.onPlacesChanged(this.searchBox.getPlaces());
    //   }
    // }
    // componentDidMount() {
    //   var input = ReactDOM.findDOMNode(this.refs.input);
    //   this.searchBox = new google.maps.places.SearchBox(input);
    //   this.searchBox.addListener('places_changed', this.onPlacesChanged);
    // }
    // componentWillUnmount() {
    //   // https://developers.google.com/maps/documentation/javascript/events#removing
    //   google.maps.event.clearInstanceListeners(this.searchBox);
    // }
  }