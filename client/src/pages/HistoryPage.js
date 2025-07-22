import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserHistory } from '../utils/api';
import History from '../components/History';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const { username, token, logout } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetchUserHistory(token);
        setHistory(res.data);
      } catch {
        console.error('Failed to fetch history');
      }
    };
    loadHistory();
  }, [token]);

  const handleClearHistory = async () => {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch('http://localhost:5000/api/history', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setHistory([]); // clear history state
    } else {
      console.error('Failed to clear history');
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

  return (
    <div>
      <h2>Search History for {username}</h2>
      <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
      <button onClick={() => navigate('/weather')}>Back to Weather</button>
      <History history={history} onClear={handleClearHistory} />
    </div>
  );
};

export default HistoryPage;
