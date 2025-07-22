const axios = require('axios');
// const axiosRetry = require('axios-retry');
const axiosRetry = require('axios-retry').default;

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});
// retries for 3 times

const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

exports.getWeatherByCity = async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(OPENWEATHER_URL, {
      timeout: 5000, // 5 seconds
      // Set a timeout so the backend doesn’t hang too long
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric',
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error('Fetch failed after retries:', err.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

exports.getWeatherByCoords = async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(OPENWEATHER_URL, {
      params: {
        lat,
        lon,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric',
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
