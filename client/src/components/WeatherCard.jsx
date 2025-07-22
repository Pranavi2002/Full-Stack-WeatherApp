import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => { // an object containing weather information (probably fetched from OpenWeather API) 
  const { name, main, weather, wind } = data; // specific properties from the data object
  // main is an object that contains temp (temperature), humidity, etc

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        // Loads a weather icon using OpenWeather’s image URL
        alt={weather[0].description}
      />
      <p><strong>{weather[0].main}</strong> - {weather[0].description}</p>
      {/* Displays a short summary like Clear - clear sky, with the main condition in bold. */}
      <p>🌡️ Temp: {main.temp}°C</p>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>💨 Wind Speed: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
