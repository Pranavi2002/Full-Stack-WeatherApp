import React from 'react';
import './History.css'

const History = ({ history, onClear }) => {
  if (!history.length) return null;

  // Group history by year → month → day
  const groupedHistory = {};

  history.forEach((entry) => {
    const date = new Date(entry.createdAt);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      // Optionally skip or group under "Unknown date"
      if (!groupedHistory['Unknown']) groupedHistory['Unknown'] = {};
      if (!groupedHistory['Unknown']['Unknown']) groupedHistory['Unknown']['Unknown'] = {};
      if (!groupedHistory['Unknown']['Unknown']['Unknown']) groupedHistory['Unknown']['Unknown']['Unknown'] = [];
      groupedHistory['Unknown']['Unknown']['Unknown'].push(entry);
      return;
    }

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    if (!groupedHistory[year]) groupedHistory[year] = {};
    if (!groupedHistory[year][month]) groupedHistory[year][month] = {};
    if (!groupedHistory[year][month][day]) groupedHistory[year][month][day] = [];

    groupedHistory[year][month][day].push(entry);
  });

  return (
    <div className="history">
      <h3>Recent Searches:</h3>
            <button onClick={onClear} className="clear-button">Clear History</button>

      {/* just render a flat list with timestamps */}
      {/* <ul>
        {history.map((h, idx) => (
          <li key={idx}>
            {h.city} ({new Date(h.timestamp).toLocaleString()})
          </li>
        ))}
      </ul> */}

      {/* Groups your history data by year, month, day */}
      {Object.entries(groupedHistory).map(([year, months]) => (
        <div key={year} className="year-group">
          <h4>{year}</h4>
          {Object.entries(months).map(([month, days]) => (
            <div key={month} className="month-group" style={{ marginLeft: '1rem' }}>
              <h5>{month}</h5>
              {Object.entries(days).map(([day, entries]) => (
                <div key={day} className="day-group" style={{ marginLeft: '2rem' }}>
                  <h6>{day}</h6>
                                    <ul>
                    {entries.map((entry, idx) => {
                      const date = new Date(entry.createdAt);
                      const timeString = !isNaN(date.getTime())
                        ? date.toLocaleTimeString()
                        : 'Unknown time';

                      return (
                        <li key={idx}>
                          {entry.city} ({timeString})
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

    </div>
  );
};

export default History;
