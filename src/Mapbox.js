import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import './Mapbox.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import ThemeSwitch from "./Switch.js"
// import { runInThisContext } from 'vm';

// note: mapbox token should be stored locally in separate file
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWljaGFlbC0zOCIsImEiOiJjam8wazR6amIwMTZrM2twbzk3dmd1ZGp2In0.7fZdbYKU1gxvl5KFV4-Eiw'

// define how often data should be fetched
const FETCH_INTERVAL = 1000

// define map reference to get viewport bounds
let myMap = null

class Mapbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      viewport: {
        width: 550,
        height: 300,
        latitude: 49.2463,
        longitude: -123.1162,
        zoom: 10
      },
      viewport_bounds: {
        north: 0,
        south: 0,
        west: 0,
        east: 0,
      },
      active_vehicles: [],
      bus_stops: [
        {
          'StopId': 60219,
          'Latitude': 49.266634,
          'Longitude': -123.244736
        },
        {
          'StopId': 52776,
          'Latitude': 49.225517,
          'Longitude': -122.958824
        },
        {
          'StopId': 61979,
          'Latitude': 49.267312,
          'Longitude': -123.246536
        },
        {
          'StopId': 50120,
          'Latitude': 49.251598,
          'Longitude': -123.167891
        },
        {
          'StopId': 60980,
          'Latitude': 49.282660,
          'Longitude': -123.117951
        },
        {
          'StopId': 52514,
          'Latitude': 49.227715,
          'Longitude': -123.008740
        },
        {
          'StopId': 53495,
          'Latitude': 49.275145,
          'Longitude': -122.798930
        },
        {
          'StopId': 58474,
          'Latitude': 49.030428,
          'Longitude': -122.795609
        },
        {
          'StopId': 53161,
          'Latitude': 49.274660,
          'Longitude': -122.799011
        },
        {
          'StopId': 60246,
          'Latitude': 49.028755,
          'Longitude': -122.801280
        },
        {
          'StopId': 61039,
          'Latitude': 49.266425,
          'Longitude': -123.114936
        },
        {
          'StopId': 51166,
          'Latitude': 49.230542,
          'Longitude': -123.005530
        },
        {
          'StopId': 52575,
          'Latitude': 49.241892,
          'Longitude': -122.982127
        },
        {
          'StopId': 60092,
          'Latitude': 49.274738,
          'Longitude': -122.800643
        },
        {
          'StopId': 61921,
          'Latitude': 49.227553,
          'Longitude': -123.004742
        },
        {
          'StopId': 52576,
          'Latitude': 49.241916,
          'Longitude': -122.987939
        },
        {
          'StopId': 61040,
          'Latitude': 49.266425,
          'Longitude': -123.115944
        },
        {
          'StopId': 51161,
          'Latitude': 49.230995,
          'Longitude': -123.007485
        },
        {
          'StopId': 51400,
          'Latitude': 49.242011,
          'Longitude': -122.969218
        },
        {
          'StopId': 51100,
          'Latitude': 49.248670,
          'Longitude': -123.153340
        },
        {
          'StopId': 50200,
          'Latitude': 49.234040,
          'Longitude': -123.132898
        },
        {
          'StopId': 50200,
          'Latitude': 49.234040,
          'Longitude': -123.132898
        },
        {
          'StopId': 52210,
          'Latitude': 49.211151,
          'Longitude': -123.095708
        },
        {
          'StopId': 60220,
          'Latitude': 49.216850,
          'Longitude': -122.593469
        },
        {
          'StopId': 60225,
          'Latitude': 49.210930,
          'Longitude': -123.073470
        },
        {
          'StopId': 60425,
          'Latitude': 49.321789,
          'Longitude': -123.075582
        },
        {
          'StopId': 50270,
          'Latitude': 49.265327,
          'Longitude': -123.235217
        },
        {
          'StopId': 50602,
          'Latitude': 49.263693,
          'Longitude': -123.229837
        },
        {
          'StopId': 50852,
          'Latitude': 49.284435,
          'Longitude': -123.112367
        },
        {
          'StopId': 50035,
          'Latitude': 49.284786,
          'Longitude': -123.111191
        },
        {
          'StopId': 58313,
          'Latitude': 49.284493,
          'Longitude': -123.114994
        },
        {
          'StopId': 50079,
          'Latitude': 49.282963,
          'Longitude': -123.112358
        },
        {
          'StopId': 61759,
          'Latitude': 49.280758,
          'Longitude': -123.126431
        },
        {
          'StopId': 50614,
          'Latitude': 49.285774,
          'Longitude': -123.126771
        },
        {
          'StopId': 50045,
          'Latitude': 49.283087,
          'Longitude': -123.123336
        },
        {
          'StopId': 61759,
          'Latitude': 49.278573,
          'Longitude': -123.130164
        },
        {
          'StopId': 52176,
          'Latitude': 49.200220,
          'Longitude': -122.916234
        },
        {
          'StopId': 60721,
          'Latitude': 49.218024,
          'Longitude': -122.668853
        },
        {
          'StopId': 52198,
          'Latitude': 49.207893,
          'Longitude': -122.998827
        },
        {
          'StopId': 51547,
          'Latitude': 49.247982,
          'Longitude': -123.004458
        },
        {
          'StopId': 61684,
          'Latitude': 49.266906,
          'Longitude': -123.094710
        },
        {
          'StopId': 50081,
          'Latitude': 49.50081,
          'Longitude': -123.111146
        },
        {
          'StopId': 54444,
          'Latitude': 49.280922,
          'Longitude': -123.115500
        },
        {
          'StopId': 52332,
          'Latitude': 49.203028,
          'Longitude': -122.908363
        },
        {
          'StopId': 51425,
          'Latitude': 49.204050,
          'Longitude': -122.914885
        },
      ],
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
      if(response.ok){
        const data = await response.json()
        this.setState({bus_stops: data})
      }
    }
    catch (e){
      console.log(e)
    }
  }
  createBusStopMarkers = () => {
    let markers = []
    for (let i = 0; i < this.state.bus_stops.length; i++) {
      // if vehicle is within viewport bounds, display vehicle marker
      const stop = this.state.bus_stops[i]
      if(
        stop.Latitude >= this.state.viewport_bounds.south &&
        stop.Latitude  <= this.state.viewport_bounds.north &&
        stop.Longitude >= this.state.viewport_bounds.west &&
        stop.Longitude <= this.state.viewport_bounds.east
        ) {
          // let classColour = "punctual"
          // if (stop['TripId'] % 2 === 0 && stop['Direction'] === "WEST"){
          //   classColour = "verylate"
          // } else if(stop['TripId'] %2 === 0 && stop['Direction'] === "EAST" && stop['RouteNo'] % 2 === 1){
          //   classColour = "early"
          // } else if(stop['Destination'] === "INDIAN RIVER" || (stop['Longitude'] < -120 && stop['TripId']%2 === 0)){
          //   classColour = "punctual"
          // } else {
          //   classColour = "late"
          // }
          markers.push(
          <Marker key={'stop-'+i} latitude={stop.Latitude} longitude={stop.Longitude} offsetLeft={-4} offsetTop={-4}>
            <div className={'stop-marker ' + this.state.marker_size }></div>
          </Marker>
          )
      }
    }
    return markers
  }

  // create markers/dots on UI to display live location of each vehicle
  createMarkers = () => {
    let markers = []
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
    
      if (this.state.bus_stops && this.state.active_vehicles.length > 0){
        for (let i = 0; i < this.state.bus_stops.length; i++) {
          // if vehicle is within viewport bounds, display vehicle marker
          const stop = this.state.bus_stops[i]
          if(
            stop.Latitude >= this.state.viewport_bounds.south &&
            stop.Latitude  <= this.state.viewport_bounds.north &&
            stop.Longitude >= this.state.viewport_bounds.west &&
            stop.Longitude <= this.state.viewport_bounds.east
            ) {
              let classColour = "busy"
              let rand = Math.floor(Math.random() * Math.floor(this.state.active_vehicles.length))
              if (stop.StopId % 2 === 0 && this.state.active_vehicles[rand]['Direction'] === "WEST"){
                classColour = "normal"
              } else if(stop.StopId % 2 === 0 && this.state.active_vehicles[rand]['TripId'] %2 === 0 && this.state.active_vehicles[rand]['RouteNo'] % 2 === 1 && this.state.active_vehicles[rand]['Direction'] === "EAST"){
                classColour = "veryBusy"
              } 
              markers.push(
              <Marker key={'stop-'+i} latitude={stop.Latitude} longitude={stop.Longitude} offsetLeft={-4} offsetTop={-4}>
                <div className={'stop-marker ' + this.state.marker_size + '-area ' + classColour}></div>
              </Marker>
              )
          }
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
        mapStyle='mapbox://styles/mapbox/dark-v9'
        ref={ map => this.mapRef = map }
        {...this.state.viewport}
        onViewportChange={this._onViewportChange}>
        
     
        <div>
          <ThemeSwitch></ThemeSwitch>
          
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
    // test fetch status
    // this.fetchStops();
    // fetch at defined interval
    this.interval = setInterval(() => this.fetchLocation(), FETCH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

}

export default Mapbox;