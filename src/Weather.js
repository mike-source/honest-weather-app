import React from "react";
import './App.css';
import { WeatherEmoji } from "./WeatherEmoji.js";

export class Weather extends React.Component {

  render() {
    // TODO check fields properly
    if (!this.props.report.current) {
      return <div className="error">Problem with getting the weather...</div>
    }
    return (
      <div className="report">
        <div className="report__main">
          <span>The weather is currently: </span>
          {/* <span>
            {this.props.report.current.weather[0].main}
          </span> */}
        </div>
        <div className="report__description">
          <WeatherEmoji code={this.props.report.current.weather[0].id}></WeatherEmoji>
          {this.props.report.current.weather[0].description} with a {this.props.report.hourly[0].pop * 100}% of getting wet.
        </div>
        <div className="report__main">
          <span>The weather will be: </span>
          {/* <span>
            {this.props.report.hourly[1].weather[0].main}
          </span> */}
        </div>
        <div className="report__description">
          <WeatherEmoji code={this.props.report.hourly[1].weather[0].id}></WeatherEmoji>
          {this.props.report.hourly[1].weather[0].description} with a {this.props.report.hourly[1].pop * 100}% of getting wet.
        </div>
      </div>

    )

  }
}