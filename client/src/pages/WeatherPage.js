import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import WeatherSearch from '../components/WeatherSearch';
import WeatherCard from '../components/WeatherCard';
import { getWeatherByCity, getWeatherByCoords, saveHistory } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const WeatherPage = () => {
  const { username, token, logout } = useContext(AuthContext);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWeatherByCity = async () => {
    if (!city) return;
    try {
      setError('');
      setLoading(true);
      setWeather(null);
      const res = await getWeatherByCity(city);
      setWeather(res.data);
      if (token) {
        await saveHistory(city, token);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  const clearWeather = () => {
  setCity('');
  setWeather(null);
  setError('');
};

const fetchWeatherByCoords = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        setError('');
        setLoading(true);
        setWeather(null);

        // Call your backend API with lat, lon
        const res = await getWeatherByCoords(latitude, longitude);
        setWeather(res.data);

        // OpenWeather API response contains the city name 
        // (usually in res.data.name)
        if (token && res.data?.name) {
          // Optionally save city or location in history 
          // (you may want to save city name from response)
          // For now, just skip or adapt as needed
          await saveHistory(res.data.name, token);
        }
      } catch (err) {
        setError('Error fetching weather by location');
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      alert("Unable to retrieve your location");
    }
  );
};


  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
      <WeatherSearch city={city} setCity={setCity} fetchWeatherByCity={fetchWeatherByCity} fetchWeatherByCoords={fetchWeatherByCoords} loading={loading}  clearWeather={clearWeather} />
      {error && <div>{error}</div>}
      {weather && <WeatherCard data={weather} />}
      <button onClick={() => navigate('/history')}>View History</button>
    </div>
  );
};

export default WeatherPage;
