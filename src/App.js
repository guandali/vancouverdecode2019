import React, { Component } from 'react';
import './App.css';
import Mapbox from './Mapbox.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>        
        <div className="map-container">
          <Mapbox></Mapbox>
        </div>   

        
      </div>
    );
  }
}

export default App;
