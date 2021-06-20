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

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Geolocation reported position: ", position);

      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      this.fetchWeatherForecast(position.coords.latitude, position.coords.longitude);
    });
  }

  /**
   * Gets the one time api from https://openweathermap.org/api/one-call-api 
   * Then sets the state to the report.
   * @param {*} lat Latitude 
   * @param {*} lon Longitude
   */
  fetchWeatherForecast(lat, lon) {
    // this needs obscuring
    const API_KEY = process.env.REACT_APP_API_KEY;
    // the things we dont need from the api, csv (alerts, minutely, hourly, daily, current)
    const exclude = "minutely,daily";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`;
    fetch(url).then((response) => {
      if (!response) {
        // TODO handle this properly!
        alert("Some error happened,");
        return;
      }
      return response.json();

    }).then((response) => {
      this.setState({
        report: response
      });
    });
  }

  render() {
    console.log(this.props);
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