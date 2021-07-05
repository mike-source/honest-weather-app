import React from 'react';

const WeatherEmoji = (props) => {
  // List of weather codes from https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  // and corresponding emoji codes for each one (approximated);
  // NOTE: the codes are grouped in 100s, then 10s for many different types.
  // TODO maybe pull this in from somewhere more central
  let emojis = {
    0: 0x0, //fallback (if getEmoji tries with floor >1000 it will return 0 => "")
    200: 0x26c8, // thunderstorms with rain⛈️
    210: 0x1f329, //thunderstorms🌩️
    220: 0x26c8, // thunderstorms w/ drizzle ?⛈️
    300: 0x1f328, // drizzle 🌨️
    500: 0x1f327, // rain 🌧️
    511: 0x2744, // freezing rain❄️
    520: 0x1f326, // showers 🌦️
    600: 0x1f328, // snow 🌨️
    700: 0x1f32b, // atmospheric conditions
    781: 0x1f32a, // tornado - just in case ;)🌪️
    800: 0x2600, // clear ☀️
    801: 0x26c5, // few clouds🌤️
    802: 0x1f325, // scattered clouds ⛅
    803: 0x2601, // clouds☁️
    804: 0x2601, // overcast☁️
  };

  /**
   * Recursively determine the correct emoji code with minimal lookups.
   * e.g. getEmoji(782) => 1F32B, getEmoji(781) => 1F32A
   * // TODO add millions of emojis to make this worthwhile ;)
   * @param {Number} code The code from open weather api
   * @param {*} floor Ignore me - starting magnitude for rounding used for recursion
   * @returns An icon with the relevant emoji!
   */
  function getEmoji(code, floor = 1) {
    if (typeof code !== 'number') return 0x0; // prevent undefined/wierd input values causing infinite recursion
    if (emojis[code]) {
      // if we have the exact code, return it.
      return emojis[code];
    } else {
      // we dont have the exact code
      floor *= 10; // use this to round down a set magnitude
      code = Math.floor(code / floor) * floor; // e.g. floor 10: 123 => 120
      /*       console.log(code, floor); */
      return getEmoji(code, floor); // try and find the exact code again, or repeat
    }
  }

  // don't forget to convert the unicodepoint into a string!
  return (
    <i className="weather-emoji">
      {String.fromCodePoint(getEmoji(props.code))}
    </i>
  );
};

//  spare emojis :)
//   ⛅26C5
//   🌨️1F328
//   ☀️2600
//   🌤️26C5
//   ⛅1F325
//   ⛅26C5
//   ☁️2601
//   🌦️1F326
//   🌧️1F327
//   ⛈️26C8
//   🌪️1F32A
//   🌫️1F32B
//   ☔2614
//   🌂1F302
//   ☂️2602
//   ❄️2744
//   💧1F4A7

export default WeatherEmoji;
