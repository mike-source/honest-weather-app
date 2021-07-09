import React from 'react';

const Location = ({ latitude, longitude, accuracy }) => {

  function formatCoord(coord, pos, neg) {
    if (coord == 0) return `${coord.toFixed(6)}`
    if (coord > 0) return `${coord.toFixed(6)} ${pos}`
    if (coord < 0) return `${coord.toFixed(6)} ${neg}`
  }

  function formatAccuracy(accuracy) {
    return `${accuracy}${isNaN(accuracy) ? "" : "m"}`

  }

  return (
    <div className="location">
      <span>You are at:</span>
      <span>{formatCoord(latitude, "North", "South")} </span>
      <span>{formatCoord(longitude, "West", "East")} </span>
      <span>Accuracy: {formatAccuracy(accuracy)}</span>
    </div>
  );
};

export default Location;
