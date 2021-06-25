import React, { useState, useEffect } from 'react';
import { Location } from './Location.js';
import { Weather } from './Weather.js';

const LocationForecast = () => {
  // default state is to locate user on null island
  // https://en.wikipedia.org/wiki/Null_Island
  const [coords, setCoords] = useState({ lat: 0, long: 0, geoip: false });

  // first find out where they are:
  useEffect(() => {
    const getLocation = async () => {
      if ('geolocation' in navigator) {
        // browser geolocation available, use it:
        navigator.geolocation.getCurrentPosition((position) => {
          setCoords({
            lat: position.coords.latitude,
            long: position.coords.longitude,
            geoip: false,
          });
        });
      } else {
        // browser geolocation NOT available, use freegeoip.app:
        const response = await fetch(`https://freegeoip.app/json/`).then(
          (response) => response.json()
        );
        setCoords({
          lat: response.latitude,
          long: response.longitude,
          geoip: true,
        });
      }
    };
    getLocation();
  }, []);

  //return <div>{JSON.stringify(coords)}</div>;

  return (
    <>
      {coords.geoip && <h2>Used GEOIP</h2>}
      <Location latitude={coords.lat} longitude={coords.long}></Location>
    </>
  );
};

export default LocationForecast;
