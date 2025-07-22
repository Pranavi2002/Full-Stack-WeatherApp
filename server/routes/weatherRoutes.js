const express = require('express');
const router = express.Router();
const { getWeatherByCity, getWeatherByCoords } = require('../controllers/weatherController');

router.get('/city/:city', getWeatherByCity);
router.get('/coords', getWeatherByCoords); // ?lat=..&lon=..

module.exports = router;
