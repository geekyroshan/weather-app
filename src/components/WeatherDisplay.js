// src/components/WeatherDisplay.js
import React, { useState } from 'react';
import axios from 'axios';
import './WeatherDisplay.css'; // Import the updated CSS

const WeatherDisplay = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(URL);
      setWeather(response.data);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('City not found or invalid API request.');
      setWeather(null); // Clear weather on error
    }
  };

  // Function to determine which class to apply based on weather
  const getWeatherClass = () => {
    if (!weather) return ''; // Default class
    const mainWeather = weather.weather[0].main.toLowerCase();
    if (mainWeather.includes('clear')) return 'sunny';
    if (mainWeather.includes('clouds')) return 'cloudy';
    if (mainWeather.includes('rain')) return 'rainy';
    return ''; // Default fallback
  };

  return (
    <div className={`weather-app ${getWeatherClass()}`}>
      <div className="weather-card">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
        <button onClick={fetchWeather} className="search-button">
          Search
        </button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-container">
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="Weather Icon"
              />
            </div>
            <div className="weather-details">
              <h2>{weather.name}</h2>
              <p>{weather.weather[0].description}</p>
              <h1>{weather.main.temp}°C</h1>
            </div>

            <div className="extra-info">
              <div>UV: {Math.floor(Math.random() * 10)}</div>
              <div>% Rain: {Math.floor(Math.random() * 50)}%</div>
              <div>AQI: {Math.floor(Math.random() * 100)}</div>
            </div>

            <div className="forecast">
              <div className="forecast-item">
                <p>Tomorrow</p>
                <p>21°C</p>
              </div>
              <div className="forecast-item">
                <p>Monday</p>
                <p>18°C</p>
              </div>
              <div className="forecast-item">
                <p>Tuesday</p>
                <p>26°C</p>
              </div>
              <div className="forecast-item">
                <p>Wednesday</p>
                <p>24°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;
