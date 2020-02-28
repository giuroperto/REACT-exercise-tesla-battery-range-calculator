import React, { Component } from 'react';
import './TeslaBattery.css';
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
import TeslaCar from '../components/TeslaCar/TeslaCar';
import TeslaStats from '../components/TeslaStats/TeslaStats';
import { getModelData } from '../services/BatteryService';
import TeslaCounter from '../components/TeslaCounter/TeslaCounter';

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
    this.statsUpdate = this.statsUpdate.bind(this);
    this.calculateStats = this.calculateStats.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.updateCounterState = this.updateCounterState.bind(this);
  }

  componentDidMount() {
    this.statsUpdate();
  }

  calculateStats(models, value) {
    const dataModels = getModelData();
    return models.map((model) => {
      const { speed, temperature, climate, wheels } = value;
      const miles = dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];
      return {
        model, miles
      };
    });
  }

  statsUpdate() {
    const carModels = ['60', '60D', '75', '75D', '90D', 'P100D'];
    this.setState({
      carstats: this.calculateStats(carModels, this.state.config)
    });
  }

  increment(e, title) {
    e.preventDefault();
    let currentValue, maxValue, step;
    const { speed, temperature } = this.props.counterDefaultVal;
    if (title === 'Speed') {
      currentValue = this.state.config.speed;
      maxValue = speed.max;
      step = speed.step;
    } else {
      currentValue = this.state.config.temperature;
      maxValue = temperature.max;
      step = temperature.step;
    }
    if (currentValue < maxValue) {
      const newValue = currentValue + step;
      this.updateCounterState(title, newValue);
    }
  }

  decrement(e, title) {
    e.preventDefault();
    let currentValue, minValue, step;
    const { speed, temperature } = this.props.counterDefaultVal;
    if (title === 'Speed') {
      currentValue = this.state.config.speed;
      minValue = speed.min;
      step = speed.step;
    } else {
      currentValue = this.state.config.temperature;
      minValue = temperature.min;
      step = temperature.step;
    }
    if (currentValue > minValue) {
      const newValue = currentValue - step;
      this.updateCounterState(title, newValue);
    }
  }

  updateCounterState(title, newValue) {
    const config = { ...this.state.config };
    title === 'Speed' ? config['speed'] = newValue : config['temperature'] = newValue;
    this.setState({
      config
    });
  }

  render() {
    return (
      <form className="tesla-battery">
        <h1>Range Per Change</h1>
        <TeslaCar wheelSize={this.state.config.wheels}/>
        <TeslaStats carstats={this.state.carstats} />
        <div className="tesla-controls cf">
          <TeslaCounter currentValue={this.state.config.speed} initValues={this.props.counterDefaultVal.speed} increment={this.increment} decrement={this.decrement} />
        </div>
        <div className="tesla-climate-container cf">
          <TeslaCounter currentValue={this.state.config.temperature} initValues={this.props.counterDefaultVal.temperature} increment={this.increment} decrement={this.decrement} />
        </div>
        <TeslaNotice />
      </form>
    )
  }
}

export default TeslaBattery;
