import React from "react";
import './App.css';

export class Weather extends React.Component {

  render() {
    console.log("Weather Report: ", this.props);

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
          {this.props.report.current.weather[0].description}
        </div>
        <div className="report__main">
          <span>The weather will be: </span>
          {/* <span>
            {this.props.report.hourly[1].weather[0].main}
          </span> */}
        </div>
        <div className="report__description">
          {this.props.report.hourly[1].weather[0].description}
        </div>
      </div>

    )

  }
}