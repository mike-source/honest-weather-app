import React, { useState, useEffect } from 'react';
import WeatherEmoji from './WeatherEmoji.js';

const Weather = ({ location }) => {
  console.log(location);
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState({});

  async function fetchWeatherForecast(location) {
    console.log('Fetching weather from our api...');
    const url = `/api/openweather?latitude=${location.latitude}&longitude=${location.longitude}`
    const report = await fetch(url).then(res => res.json());
    return report;
  }

  useEffect(() => {
    async function getWeather() {
      await fetchWeatherForecast({
        latitude: location.latitude,
        longitude: location.longitude,
      }).then((weatherInfo) => {
        setForecast(weatherInfo);
        setLoading(false);
      });
    }

    getWeather();

    console.log(forecast);
  }, [location]);

  // TODO check fields properly
  if (loading) {
    return <div className="error">Fetching Weather...</div>;
  }
  return (
    <div className="report">
      <div className="report__main">
        <span>The weather is currently: </span>
        {/* <span>
            {forecast.current.weather[0].main}
          </span> */}
      </div>
      <div className="report__description">
        <WeatherEmoji code={forecast.current.weather[0].id}></WeatherEmoji>
        {forecast.current.weather[0].description} with a{' '}
        {forecast.hourly[0].pop * 100}% of getting wet.
      </div>
      <div className="report__main">
        <span>The weather will be: </span>
        {/* <span>
            {forecast.hourly[1].weather[0].main}
          </span> */}
      </div>
      <div className="report__description">
        <WeatherEmoji code={forecast.hourly[1].weather[0].id}></WeatherEmoji>
        {forecast.hourly[1].weather[0].description} with a{' '}
        {forecast.hourly[1].pop * 100}% of getting wet.
      </div>
    </div>
  );
};

export default Weather;
