import React from 'react';

const Location = ({ latitude, longitude, accuracy }) => {
  return (
    <div className="location">
      <span>You are at:</span>
      <span>{latitude.toFixed(6)} lat</span>
      <span>{longitude.toFixed(6)} long</span>
      <span>Accuracy(m): {accuracy}</span>
    </div>
  );
};

export default Location;
