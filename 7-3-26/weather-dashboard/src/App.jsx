import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('Mumbai');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const getCoordinates = async (cityName) => {
    const res = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    if (res.data.results?.length > 0) {
      const { latitude, longitude, name } = res.data.results[0];
      return { latitude, longitude, name };
    }
    throw new Error('City not found');
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const { latitude, longitude, name } = await getCoordinates(cityName);

      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
        `&timezone=auto`
      );

      const current = weatherRes.data.current;
      const daily = weatherRes.data.daily;

      setWeather({
        city: name,
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        weatherCode: current.weather_code,
      });

      const formattedForecast = daily.time.map((date, i) => ({
        date: new Date(date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
        maxTemp: Math.round(daily.temperature_2m_max[i]),
        minTemp: Math.round(daily.temperature_2m_min[i]),
        precipProb: daily.precipitation_probability_max[i],
        weatherCode: daily.weather_code[i],
      }));

      setForecast(formattedForecast);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherEmoji = (code) => {
    const emojis = {
      0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
      45: '🌫️', 48: '🌫️',
      51: '🌦️', 53: '🌧️', 55: '🌧️',
      61: '🌧️', 63: '🌧️', 65: '🌧️',
      71: '❄️', 73: '❄️', 75: '❄️',
      80: '🌦️', 81: '🌧️', 82: '⛈️',
      95: '⛈️', 96: '⛈️', 99: '⛈️'
    };
    return emojis[code] || '🌥️';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      fetchWeather(searchInput.trim());
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden relative">
      {/* Background subtle particles / glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(129,140,248,0.15),transparent)]"></div>

      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🌤️</div>
            <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
              WeatherSphere
            </h1>
          </div>
          <div className="text-sm text-white/50">Real-time • Open-Meteo</div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-16">
          <div className="relative group">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search city... (e.g. Tokyo, Paris, Dubai)"
              className="w-full px-8 py-5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl text-lg focus:outline-none focus:border-indigo-400 transition-all placeholder:text-white/40"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 px-10 py-3 rounded-2xl font-medium transition-all active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-500/30 rounded-full animate-spin"></div>
              <div className="absolute inset-0 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-8 text-xl text-white/70">Fetching latest weather...</p>
          </div>
        )}

        {error && (
          <div className="text-center bg-red-500/10 border border-red-500/30 p-10 rounded-3xl max-w-md mx-auto">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-xl mb-6">{error}</p>
            <button
              onClick={() => fetchWeather(city)}
              className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-2xl transition"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && weather && (
          <div className="space-y-10">
            {/* Current Weather - Hero Card */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-4xl p-12 relative overflow-hidden">
              <div className="absolute top-8 right-8 text-8xl opacity-20">
                {getWeatherEmoji(weather.weatherCode)}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div>
                  <h2 className="text-6xl font-light tracking-tight">{weather.city}</h2>
                  <div className="mt-2 text-white/60 text-xl">Today</div>
                </div>

                <div className="text-center">
                  <div className="text-[180px] leading-none font-thin">
                    {weather.temperature}
                    <span className="text-6xl align-super">°C</span>
                  </div>
                  <p className="text-3xl text-white/70 -mt-6">
                    Feels like {weather.feelsLike}°C
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-8xl mb-6">
                    {getWeatherEmoji(weather.weatherCode)}
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-lg">
                    <div>
                      <p className="text-white/50 text-sm">Humidity</p>
                      <p className="font-medium text-2xl">{weather.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">Wind</p>
                      <p className="font-medium text-2xl">{weather.windSpeed} km/h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div>
              <h3 className="text-2xl font-medium mb-8 flex items-center gap-3">
                <span>7-Day Forecast</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
                {forecast.map((day, index) => (
                  <div
                    key={index}
                    className="group bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 hover:border-indigo-400/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                  >
                    <p className="text-white/70 font-medium text-center mb-6">{day.date}</p>

                    <div className="text-7xl text-center mb-8 transition-transform group-hover:scale-110">
                      {getWeatherEmoji(day.weatherCode)}
                    </div>

                    <div className="text-center">
                      <div className="text-4xl font-light">
                        {day.maxTemp}°
                        <span className="text-white/40 text-2xl ml-1">/</span>
                        <span className="text-white/60 text-2xl">{day.minTemp}°</span>
                      </div>

                      {day.precipProb > 15 && (
                        <div className="mt-4 inline-flex items-center gap-1 text-sky-400 text-sm bg-sky-500/10 px-4 py-1 rounded-full">
                          💧 {day.precipProb}% 
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-white/40 text-sm mt-20">
          Modern Weather Dashboard • Built with React + Vite
        </p>
      </div>
    </div>
  );
}

export default App;