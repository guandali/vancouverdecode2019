import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import './Mapbox.css';
import 'mapbox-gl/dist/mapbox-gl.css'
// import { runInThisContext } from 'vm';

// note: mapbox token should be stored locally in separate file
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWljaGFlbC0zOCIsImEiOiJjam8wazR6amIwMTZrM2twbzk3dmd1ZGp2In0.7fZdbYKU1gxvl5KFV4-Eiw'

// define how often data should be fetched
const FETCH_INTERVAL = 800

// define map reference to get viewport bounds
let myMap = null

class Mapbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      viewport: {
        width: 900,
        height: 500,
        latitude: 49.2463,
        longitude: -123.1162,
        zoom: 11
      },
      viewport_bounds: {
        north: 0,
        south: 0,
        west: 0,
        east: 0,
      },
      active_vehicles: [],
      marker_size: 'small',
    };
  }

  _onViewportChange = viewport => {
    this.setState({viewport});
    this.updateViewportBounds()
    // Depending on zoom level, change Markers' class to dynamically change their display size
    if(this.state.viewport.zoom < 12.9) {
      this.setState({marker_size: 'marker-small'})
    } else if (this.state.viewport.zoom < 13.4) {
      this.setState({marker_size: 'marker-medium'})
    } else {
      this.setState({marker_size: 'marker-large'})
    }
  };

  updateViewportBounds = () => {
    let bounds = myMap.getBounds();
    this.setState({
      viewport_bounds: {
        north: bounds._ne.lat,
        south: bounds._sw.lat,
        west: bounds._sw.lng,
        east: bounds._ne.lng,
      }
    })
  }

  // fetch location data from endpoint
  fetchLocation = async () => {
    try {
      let locationURL = "/buses/location"
      const response = await fetch(locationURL)
      if(response.ok){
        const data = await response.json()
        this.setState({ active_vehicles: data })
      }
    }
    catch (e){
      console.log(e)
    }
  }

  // fetch location data from endpoint
  fetchStops =  async () => {
    try {
      let statusURL = "/stops"
      const response = await fetch(statusURL)
      console.log(response)
      if(response.ok){
        console.log(response)
        const data = await response.json()
        console.log(data)
      }
      
      console.log(response)
    }
    catch (e){
      console.log(e)
    }
  }

  // create markers/dots on UI to display live location of each vehicle
  createMarkers = () => {
    let markers = [];
    if(this.state.active_vehicles){
      for (let i = 0; i < this.state.active_vehicles.length; i++) {
        // if vehicle is within viewport bounds, display vehicle marker
        const vehicle = this.state.active_vehicles[i]
        if(
          vehicle['Latitude'] >= this.state.viewport_bounds.south &&
          vehicle['Latitude'] <= this.state.viewport_bounds.north &&
          vehicle['Longitude'] >= this.state.viewport_bounds.west &&
          vehicle['Longitude'] <= this.state.viewport_bounds.east
          ) {
            let classColour = "punctual"
            if (vehicle['TripId'] % 2 === 0 && vehicle['Direction'] === "WEST"){
              classColour = "verylate"
            } else if(vehicle['TripId'] %2 === 0 && vehicle['Direction'] === "EAST" && vehicle['RouteNo'] % 2 === 1){
              classColour = "early"
            } else if(vehicle['Destination'] === "INDIAN RIVER" || (vehicle['Longitude'] < -120 && vehicle['TripId']%2 === 0)){
              classColour = "punctual"
            } else {
              classColour = "late"
            }
            markers.push(
            <Marker key={i} latitude={vehicle['Latitude']} longitude={vehicle['Longitude']} offsetLeft={-4} offsetTop={-4}>
              <div className={'location-marker ' + this.state.marker_size + " " + classColour}></div>
            </Marker>
            )
        }
      }
      return markers
    }
  }

  render() {
    return (
      <ReactMapGL
        // mapbox API access token
        mapboxApiAccessToken={MAPBOX_TOKEN}
        // mapbox styling/theme
        mapStyle='mapbox://styles/mapbox/light-v9'
        ref={ map => this.mapRef = map }
        {...this.state.viewport}
        onViewportChange={this._onViewportChange}>

        <div>
          {this.createMarkers()}
        </div>

      </ReactMapGL>
    );
  }

  componentDidMount() {
    // store map and its viewport bounds
    myMap = this.mapRef.getMap();
    this.updateViewportBounds();
    // initial fetch
    this.fetchLocation();
    //test fetch status
    this.fetchStops();
    // fetch at defined interval
    this.interval = setInterval(() => this.fetchLocation(), FETCH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

}

export default Mapbox;