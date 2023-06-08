import React, { useEffect, useState } from "react";

interface WeatherData {
  temperature: string;
  weather: string;
}

export function WeatherShowcase() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=d42513d17426425f8ca192746230806&q=London&aqi=no",
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({
          temperature: data.temperature,
          weather: data.weather,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, []);

  return (
    <div className="mt-6 rounded-md bg-blue-500 p-4 text-white">
      {weatherData ? (
        <>
          <h2 className="text-xl font-bold">London Weather</h2>
          <p className="mt-2">{`Temperature: ${weatherData.temperature}`}</p>
          <p className="mt-1">{`Weather: ${weatherData.weather}`}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
