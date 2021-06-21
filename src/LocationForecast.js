import React from 'react';
import { Location } from './Location.js';
import { Weather } from './Weather.js';


export class LocationForecast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      report: {},
    };
  }

  async componentDidMount() {
    const position = await this.getLocation();
    console.log("Got Location:", position);

    this.setState({
      latitude: position.latitude,
      longitude: position.longitude,
    });

    const report = await this.fetchWeatherForecast({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });

    console.log("Weather Report: ", this.props);
    this.setState({ report: report });
  }

  getLocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        // browser location
        (position) => {
          console.log("Geolocation reported position: ", position);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        // no browser location - fallback to geoip
        (error) => {
          console.log("Browser Geolocation failed", error);
          this.fetchLocationFromIp().then(location => {
            resolve(location);
          })
        });
    });
  }

  /**
   *  uses freegeoip.app to get the location of the request
   */
  async fetchLocationFromIp() {
    const url = `https://freegeoip.app/json/`;
    const response = await fetch(url).then(response => response.json());
    return {
      latitude: response.latitude,
      longitude: response.longitude,
    };
  }

  /**
   * Gets the one time api from https://openweathermap.org/api/one-call-api 
   * Then sets the state to the report.
   * @param {String | number} location.latitude Latitude 
   * @param {String | number} location.longitude Longitude
   */
  async fetchWeatherForecast(location) {
    // this needs obscuring
    const API_KEY = process.env.REACT_APP_API_KEY;
    // the things we dont need from the api, csv (alerts, minutely, hourly, daily, current)
    const exclude = "minutely,daily";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=${exclude}&appid=${API_KEY}`;
    const report = await fetch(url).then(response => response.json());
    return report;
  }

  render() {
    // console.log(this.props);
    return (
      <>
        <Location
          latitude={this.state.latitude}
          longitude={this.state.longitude}>
        </Location>
        <Weather
          report={this.state.report}>
        </Weather>

      </>
    )
  }
}