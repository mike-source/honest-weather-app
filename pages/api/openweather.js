const { getClientIp } = require('request-ip');

export default async function handler(req, res) {
  console.log('Fetching weather...');
  // this needs obscuring
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY; //process.env.REACT_APP_API_KEY;
  console.log('key is:' + API_KEY);

  const location = await checkLocation(req);

  // the things we dont need from the api, csv (alerts, minutely, hourly, daily, current)
  const exclude = 'minutely,daily';
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=${exclude}&appid=${API_KEY}`;
  const report = await fetch(url);
  const data = await report.json();
  res.status(200).json(data);
}

async function checkLocation(req) {
  if (req.query.latitude == "ip" && req.query.longitude == "ip") {
    console.log("y");
    let ip = getClientIp(req);
    console.log("REQ IP:", getClientIp(req));
    console.log('NODE_ENV:' + process.env.NODE_ENV);
    if (process.env.NODE_ENV == 'development' && ip == '127.0.0.1') {
      // if we are developing locally, fake an ip address

      ip = "86.123.123.123";
    }

    const location = await fetch(`https://freegeoip.app/json/${ip}`).then(r => r.json());
    console.log("REV IP:", location);
    return location;

  } else {
    return {
      latitude: req.query.latitude,
      longitude: req.query.longitude,
    }
  }
}
