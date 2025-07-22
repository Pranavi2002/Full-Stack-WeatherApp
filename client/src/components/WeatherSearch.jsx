import React from 'react';
import './WeatherSearch.css'

const WeatherSearch = ({ city, setCity, fetchWeatherByCity, loading, clearWeather, fetchWeatherByCoords }) => (
  <div className="search">
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter City"
    />
    <button onClick={fetchWeatherByCity}>Search</button>
    <button onClick={fetchWeatherByCoords} style={{ marginLeft: '8px' }}>
      Use My Location
    </button>
    <button className='clear' onClick={clearWeather}>Clear</button>
    {loading && <p>Loading...</p>}
  </div>
);

export default WeatherSearch;
