const { getClientIp } = require('request-ip');
const cache = require('memory-cache');

export default async function handler(req, res) {
  //if we have a location, use it, otherwise fetch coords from IP 
  const location = await checkLocation(req);
  console.log('Fetching weather...');
  const data = await getCachedWeatherData(location);
  //if we have an error from the api will tell us the error "cod" (code)
  console.log('data', data);
  if (data.cod) {
    res.status(data.cod).json(data);
  } else {
    const weather = await extractWeatherData(data);
    // console.log("weather", weather);
    res.status(200).json(weather);
  }
}

async function checkLocation(req) {
  if (req.query.latitude == "ip" && req.query.longitude == "ip") {
    let ip = getClientIp(req);
    console.log("REQ IP:", ip);
    // if we are developing locally, fake an ip address
    console.log('NODE_ENV:' + process.env.NODE_ENV);
    if (process.env.NODE_ENV == 'development' && ip == '127.0.0.1') {
      ip = process.env.DEV_IP ?? "86.1.1.1";
    }
    //fetch the location
    const location = await fetch(`https://freegeoip.app/json/${ip}`).then(r => r.json());
    console.log("REV IP:", location);
    return location;

  } else {
    return {
      latitude: req.query.latitude,
      longitude: req.query.longitude,
    }
    // ...req.query
  }
}

// take openweather api response and pull the data we need from it.
// this function should standardise the data format passed from our api in case we change provider.
async function extractWeatherData(data) {
  // in case we have an error (message) don't bother trying to parse the data
  if (data.message) {
    return data;
  }
  return {
    current: {
      // temp: data.current.temp,
      // clouds: data.current.clouds,
      // feels_like: data.current.feels_like,
      pop: data.hourly[0].pop,
      ...data.current.weather[0] // == id, main, description, owicon 
    },
    next: {
      // temp: data.hourly[1].temp,
      // clouds: data.hourly[1].clouds,
      // feels_like: data.hourly[1].feels_like,
      pop: data.hourly[1].pop,
      ...data.hourly[1].weather[0] // == id, main, description, owicon 
    },
    // alerts: TODO if there are alerts ?
  }
}

// use openweathermap to fetch data for the location
async function getWeatherData(coords, options) {
  // check we have the correct parameters to continue or error.
  if (!coords?.latitude && !coords?.longitude) {
    return { code: 500, message: "No location provided" };
  }
  // use optional exclude params or default.
  const units = options?.units ?? 'standard';
  const exclude = options?.exclude ?? 'minutely,daily';
  //TODO Language ??
  // optionally change the api key, or use one from environment
  const API_KEY = options?.api_key ?? process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  // fetch the api with the options (https://openweathermap.org/api/one-call-api)
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=${exclude}&units=${units}&appid=${API_KEY}`;
  const data = await fetch(url).then(r => r.json());
  return data;
}

// save responses to save battering the API (only get 30 reqs per hour or something for free)
async function getCachedWeatherData(url, options) {
  const CACHE_LENGTH = 1000 * 60 * 30; //30 mins in ms
  const cached = cache.get(url);
  if (cached) {
    return cached;
  } else {
    const data = await getWeatherData(url, options);
    cache.put(url, data, CACHE_LENGTH);
    return data;
  }
}
