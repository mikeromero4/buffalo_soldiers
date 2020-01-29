import React, { Component, ReactDOM } from "react"
import GoogleMapReact from "google-map-react"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import controllable from "react-controllables"

function Markers(locations, z, s, handleClickOpen) {
  return locations.map((e, i) => (
    <AnyReactComponent
      {...{ z, s, i, handleClickOpen }}
      text={e.name}
      lat={e.lat}
      lng={e.lng}
      distance={e.d}
    />
  ))
}

const AnyReactComponent = ({ text, z, s, i, $hover }) => (
  <div
    className={
      "marker" + ($hover ? " hover" : "") + ($hover || z > 5 ? " active" : "")
    }
  >
    <LocationOnIcon />
    <span style={{ padding: "3px" }}>{$hover || z > 5 ? text : ""}</span>
  </div>
)

class Comp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 7,
      selected: 0,
      changed: false,
    }
  }
  static defaultProps = {
    center: {
      lat: 33 + 13 / 2,
      lng: -76 - 40 / 2,
    },
    zoom: 3.6,
  }
  componentDidUpdate(p, s) {
    if (p.moved != this.props.moved) {
      console.log("zooooom")
      this.setState({ changed: false })
    }
  }
  componentDidMount() {
    console.log("map mount")
  }
  _onBoundsChange = ({ center, zoom } /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center)
    this.props.onZoomChange(zoom)
  }
  _onChildClick = (key, childProps) => {
    this.props.handleClickOpen(key)
    this.setState({ selected: key })

    this.props.onCenterChange([childProps.lat, childProps.lng])
  }
  render() {
    console.log(this.state.changed)
    return (
      // Important! Always set the container height explicitly
      <div key="map1" className="map" style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          key="map1a"
          debounced={true}
          bootstrapURLKeys={{ key: "AIzaSyBi8HYhLfAHJ1SebXf7Bz2Q05h0L8ho-Vg" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.props.center}
          zoom={this.props.zoom}
          onChildClick={this._onChildClick}
          onChange={this._onBoundsChange}
        >
          {Markers(
            this.props.locations,
            this.props.zoom,
            this.state.selected,
            this.props.handleClickOpen
          )}
        </GoogleMapReact>
      </div>
    )
  }
}

let Tt = controllable(Comp, ["center", "zoom", "hoverKey", "clickKey"])
export default Tt
