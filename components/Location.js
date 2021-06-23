import React from 'react';

export class Location extends React.Component {
  render() {
    return (
      <div className="location">
        <span>You are at:</span>
        <span>{this.props.latitude}</span>
        <span>{this.props.longitude}</span>
      </div>
    )
  }
}