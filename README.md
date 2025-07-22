# 🌤️ Full-Stack MERN Weather App

A modern weather application built with the **MERN stack (MongoDB, Express, React, Node.js)** that allows users to search for current weather conditions by city or by using geolocation. Registered users can also view their weather search history.

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js (with Hooks & Context API)  
- Axios  
- HTML/CSS (custom + Bootstrap optional)

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- OpenWeatherMap API

---

## 📦 Folder Structure

weatherapp-fullstack/
│
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ └── .env # (Not committed - add your OpenWeather API key here)
│
├── server/ # Node/Express backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── .env # (Not committed - add your Mongo URI and JWT secret here)
│
├── .gitignore
├── README.md
└── package.json # Project-level (optional if separate for client/server)

---

## 🔑 Features

- 🔍 Search weather by city name  
- 📍 Get weather using browser geolocation  
- 🧾 Login/Register using secure JWT tokens  
- 🕒 Search history per user (only for logged-in users)  
- 🧼 Clear current weather search  
- 🌐 Connects to OpenWeatherMap API  

---

## 🔧 Environment Variables 

### `server/.env`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENWEATHER_API_KEY=your_openweathermap_api_key