import React from 'react';
import { useGeolocation } from 'react-use';
import { Location } from './Location.js';
import { Weather } from './Weather.js';

const LocationForecast = () => {
  // TO DO: Find a better way to get location via react hook as this is v.buggy
  const position = useGeolocation();

  console.log(position);

  return (
    <>
      <Location
        latitude={position.latitude}
        longitude={position.longitude}
      ></Location>
    </>
  );
};

export default LocationForecast;
