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
        latitude: location?.latitude,
        longitude: location?.longitude,
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
    return <div className="loading">Fetching Weather...</div>;
  }
  if (forecast.message) {
    return <div className="error">There has been an error fetching the weather</div>
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
        <WeatherEmoji code={forecast.current.id}></WeatherEmoji>
        {forecast.current.description} with a{' '}
        {forecast.current.pop * 100}% of getting wet.
      </div>
      <div className="report__main">
        <span>The weather will be: </span>
        {/* <span>
            {forecast.hourly[1].weather[0].main}
          </span> */}
      </div>
      <div className="report__description">
        <WeatherEmoji code={forecast.next.id}></WeatherEmoji>
        {forecast.next.description} with a{' '}
        {forecast.next.pop * 100}% of getting wet.
      </div>
    </div>
  );
};

export default Weather;
