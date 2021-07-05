import React, { useState, useEffect } from 'react';
import Location from './Location.js';
import Weather from './Weather.js';

const LocationForecast = () => {
  // default state is to locate user on null island
  // https://en.wikipedia.org/wiki/Null_Island
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    accuracy: 'Unknown',
    error: null,
  });

  // first find out where they are:
  useEffect(() => {
    const handleGeoLocation = (position) => {
      console.log(position);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        error: null,
      });
    };

    const handleGeoLocationError = async (error) => {
      console.log(error);
      // uses freegeoip.app to get the location of the request:
      // const response = await fetch(`https://freegeoip.app/json/`).then(
      //   (response) => response.json()
      // );
      setLocation({
        latitude: 'ip',
        longitude: 'ip',
        accuracy: 'Unknown',
        error: error.message,
      });
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
    const watchId = navigator.geolocation.watchPosition(
      handleGeoLocation, // use device geo location
      handleGeoLocationError // fallback to geo IP lookup
    );

    // clean up:
    return () => {
      // remove location listener when component unmounts
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <>
      {location.error && (
        <>
          <p>Attempting to locate via IP, location data may be inaccurate...</p>
        </>
      )}
      {location.error || <Location
        latitude={location.latitude}
        longitude={location.longitude}
        accuracy={location.accuracy}
      ></Location>
      }
      <Weather location={location}></Weather>
    </>
  );
};

export default LocationForecast;
