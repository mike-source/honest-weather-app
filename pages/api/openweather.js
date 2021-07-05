export default async function handler(req, res) {
  console.log('Fetching weather...');
  // this needs obscuring
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY; //process.env.REACT_APP_API_KEY;
  console.log('key is:' + API_KEY);
  console.log('NODE_ENV:' + process.env.NODE_ENV);
  // the things we dont need from the api, csv (alerts, minutely, hourly, daily, current)
  const query = req.query;

  const exclude = 'minutely,daily';
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${query.latitude}&lon=${query.longitude}&exclude=${exclude}&appid=${API_KEY}`;
  const report = await fetch(url);
  const data = await report.json();
  console.log(data);
  res.status(200).json(data);
}