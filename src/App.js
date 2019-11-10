import React, { Component } from 'react';
import './App.css';
import Mapbox from './Mapbox.js'
import Switch from "react-switch"
import ThemeSwitch from "./Switch.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <div className="map-container">
          <Mapbox></Mapbox>
        </div>   

        
      </div>
    );
  }
}

export default App;
