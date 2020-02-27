import React, { Component } from 'react';
import './TeslaBattery.css';
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
import TeslaCar from '../components/TeslaCar/TeslaCar';

class TeslaBattery extends Component {
  constructor(props){
    super(props);

    this.state = {
      carstats: [],
      config: {
        speed: 55,
        temperature: 20,
        climate: true,
        wheels: 19,
      }
    };
  }

  render() {
    return (
      <form className="tesla-battery">
        <h1>Range Per Change</h1>
        <TeslaCar wheelSize={this.state.config.wheels}/>
        <TeslaNotice />
      </form>
    )
  }
}

export default TeslaBattery;