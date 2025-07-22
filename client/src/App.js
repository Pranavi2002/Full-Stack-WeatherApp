import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import './App.css';
// import AuthForm from './components/AuthForm';
// import WeatherSearch from './components/WeatherSearch';
// import WeatherCard from './components/WeatherCard';
// import History from './components/History';
// import {
//   login,
//   register,
//   getWeather,
//   saveHistory,
//   fetchUserHistory
// } from './utils/api';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import WeatherPage from './pages/WeatherPage';
import HistoryPage from './pages/HistoryPage';

function App() {

//   // Auth states
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [username, setUsername] = useState(localStorage.getItem('username') || '');

//   // Weather & UI states
//   const [city, setCity] = useState(''); // Stores user input (city name)
//   const [weather, setWeather] = useState(null); // Stores the weather data fetched from backend
//   const [loading, setLoading] = useState(false); // Shows loading state while fetching
//   const [history, setHistory] = useState([]); // Stores the history of the searched data
//   const [error, setError] = useState(''); // Stores error messages like "City not found"

//   // Auth form states
//   const [isLogin, setIsLogin] = useState(true);
//   const [authUsername, setAuthUsername] = useState('');
//   const [authPassword, setAuthPassword] = useState('');
//   const [authError, setAuthError] = useState('');

//   // Login/Register handler
//   const handleAuthSubmit = async () => {
//     if (!authUsername || !authPassword) {
//       setAuthError('Please fill all fields');
//       return;
//     }
//     try {
//       setAuthError('');
//       // const url = isLogin ? `${API_BASE}/auth/login` : `${API_BASE}/auth/register`;
//       // const res = await axios.post(url, { username: authUsername, password: authPassword });

//       const res = isLogin
//         ? await login(authUsername, authPassword)
//         : await register(authUsername, authPassword);

//       if (isLogin) {
//         setToken(res.data.token);
//         setUsername(res.data.username);
//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('username', res.data.username);
//         // setAuthUsername('');
//         // setAuthPassword('');
//         fetchHistory(res.data.token);
//       } else {
//         alert('Registration successful, please log in.');
//         setIsLogin(true);
//         // setAuthUsername('');
//         // setAuthPassword('');
//       }
//       setAuthUsername('');
//       setAuthPassword('');
//     } catch (err) {
//       setAuthError(err.response?.data?.error || 'Authentication failed');
//     }
//   };

//   // Logout
//   const logout = () => {
//     setToken('');
//     setUsername('');
//     setWeather(null);
//     setHistory([]);
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//   };

//   // Fetch weather
//   const fetchWeather = async () => {
//     if (!city) return; // If no city is entered, return early
//     try {
//       setLoading(true);
//       setError('');  // Clear previous errors before new request
//       setWeather(null); // Clear previous weather data for fresh load

//       // const res = await axios.get(`http://localhost:5000/api/weather/city/${city}`);
//       const res = await getWeather(city);
//       setWeather(res.data); 
//       // On success: stores the data in weather, clears any errors
//       setError('');
      
//       // // Save search history after successful fetch with no user auth
//       // await axios.post(`http://localhost:5000/api/history`, { city });
//       // fetchHistory(); // refresh history after saving

//       // toekn for user authentication
//       if (token) {
//         // await axios.post(`http://localhost:5000/api/history`, { city }, {
//         //   headers: { Authorization: `Bearer ${token}` }
//         // });
//         await saveHistory(city, token);
//         fetchHistory(token);
//       }

//     } catch (err) {
//       console.error(err.response?.data || err.message);

//       if (err.response && err.response.status === 404) {
//         setError('City not found');
//         // On failure: sets an error message, clears previous weather data
//       } else if (err.response && err.response.status === 500) {
//         setError('Internal server error. Try again later.');
//       } else {
//         setError('Failed to fetch data. Please check your connection or try again.');
//       }
//       setWeather(null); // Clear weather data on error
//     } finally {
//       setLoading(false);
//       // finally: Always stops the loading spinner
//     }
//   };

// //  // fetch history, normally with no user authentication
// //   const fetchHistory = async () => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/api/history`);
// //       setHistory(res.data);
// //     } catch (err) {
// //       console.error('Could not load search history');
// //     }
//  //   };
// // On app load, use fetch history
// //   useEffect(() => {
// //     fetchHistory();
// //   }, []);


//   // Fetch search history for logged-in user
//   const fetchHistory = async (authToken = token) => {
//     if (!authToken) return;
//     try {
//       // const res = await axios.get(`${API_BASE}/history`, {
//       //   headers: { Authorization: `Bearer ${authToken}` }
//       // });
//       const res = await fetchUserHistory(authToken);
//       setHistory(res.data);
//     } catch (err) {
//       console.error('Failed to fetch search history');
//     }
//   };

//     // On app load, fetch history if logged in
//   useEffect(() => {
//     if (token) fetchHistory();
//   }, [token]);

//   // return (
//   //   <div className="App">
//   //     <h1>Weather App</h1>

//   //     {!token ? (
//   //       <div className="auth-form">
//   //         <h2>{isLogin ? 'Login' : 'Register'}</h2>
//   //         <input
//   //           type="text"
//   //           placeholder="Username"
//   //           value={authUsername}
//   //           onChange={e => setAuthUsername(e.target.value)}
//   //         />
//   //         <input
//   //           type="password"
//   //           placeholder="Password"
//   //           value={authPassword}
//   //           onChange={e => setAuthPassword(e.target.value)}
//   //         />
//   //         <button onClick={handleAuthSubmit}>{isLogin ? 'Login' : 'Register'}</button>
//   //         <p className="error">{authError}</p>
//   //         <p>
//   //           {isLogin ? 'New user?' : 'Already registered?'}{' '}
//   //           <button onClick={() => { setIsLogin(!isLogin); setAuthError(''); }}>
//   //             {isLogin ? 'Register here' : 'Login here'}
//   //           </button>
//   //         </p>
//   //       </div>
//   //     ) : (
//   //       <>
//   //         <p>Welcome, <b>{username}</b>! <button onClick={logout}>Logout</button></p>

//   //     <div className='search'>
//   //       <input
//   //         type='text'
//   //         value={city} 
//   //         onChange={(e) => setCity(e.target.value)}
//   //         placeholder='Enter City'
//   //       />
//   //       <button onClick={fetchWeather}>Search</button>
//   //     </div>
//   //     {loading && <p>Loading...</p>}
//   //     {/* Show error with retry button */}
//   //     {error && (
//   //       <div>
//   //         {error} <button onClick={fetchWeather}>Retry</button>
//   //       </div>
//   //     )}
//   //     {weather && <WeatherCard data={weather} />}
//   //     {/* You can display search history here */}
//   //       {history.length > 0 && (
//   //       <div className="history">
//   //         <h3>Recent Searches:</h3>
//   //         <ul>
//   //           {history.map((h, idx) => (
//   //             <li key={idx}>{h.city} ({new Date(h.timestamp).toLocaleString()})</li>
//   //           ))}
//   //         </ul>
//   //       </div>
//   //     )}
//   //     </>
//   //     )}
//   //   </div>
//   // );

//   return (
//     <div className="App">
//       <h1>Weather App</h1>
//       {!token ? (
//         <AuthForm
//           isLogin={isLogin}
//           authUsername={authUsername}
//           authPassword={authPassword}
//           setAuthUsername={setAuthUsername}
//           setAuthPassword={setAuthPassword}
//           handleAuthSubmit={handleAuthSubmit}
//           authError={authError}
//           setIsLogin={setIsLogin}
//           setAuthError={setAuthError}
//         />
//       ) : (
//         <>
//           <p>
//             Welcome, <b>{username}</b>! <button onClick={logout}>Logout</button>
//           </p>
//           <WeatherSearch city={city} setCity={setCity} fetchWeather={fetchWeather} loading={loading} />
//           {error && (
//             <div>
//               {error} <button onClick={fetchWeather}>Retry</button>
//             </div>
//           )}
//           {weather && <WeatherCard data={weather} />}
//           <History history={history} />
//         </>
//       )}
//     </div>
//   );

// Use of AuthContext
  return (
   <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/weather"
            element={
              <RequireAuth>
                <WeatherPage />
              </RequireAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequireAuth>
                <HistoryPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );

}

// Use of AuthContext
function RequireAuth({ children }) {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/" replace />;
}

export default App;