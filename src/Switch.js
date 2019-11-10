import React, { Component } from 'react';
import './Switch.css';
import Switch from "react-switch"

class ThemeSwitch extends Component {
    constructor() {
      super();
      this.state = { checked: false };
      this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(checked) {
      this.setState({ checked });
    }
    render() {
      return (
        <label>
          <span>Light Theme</span>
          <Switch onChange={this.handleChange} checked={this.state.checked} />
        </label>
      );
    }
  }
  
export default ThemeSwitch