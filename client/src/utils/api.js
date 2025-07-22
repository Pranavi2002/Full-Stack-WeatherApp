import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const login = (username, password) =>
  axios.post(`${API_BASE}/auth/login`, { username, password });

export const register = (username, password) =>
  axios.post(`${API_BASE}/auth/register`, { username, password });

export const getWeatherByCity = (city) =>
  axios.get(`${API_BASE}/weather/city/${city}`);

export const getWeatherByCoords = (lat, lon) =>
  axios.get(`${API_BASE}/weather/coords`, {
    params: { lat, lon }
  });

export const saveHistory = (city, token) =>
  axios.post(`${API_BASE}/history`, { city }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const fetchUserHistory = (token) =>
  axios.get(`${API_BASE}/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });
