import React, { useState } from 'react';
import axios from 'axios';
import './WeatherDisplay.css'; // Import CSS for component-specific styles

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

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-container">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
