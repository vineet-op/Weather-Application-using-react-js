// https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=cdac4a3619cfb4d4bb2ef0ca0fee98b5#
import React, { useState, useEffect } from "react";
import WeatherCard from "./weatherCard";
import "./style.css";
export const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [weatherInfo, setWeatherInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&mode=json&units=metric&appid=cdac4a3619cfb4d4bb2ef0ca0fee98b5`;

      const response = await fetch(url);
      const data = await response.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myWeather = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setWeatherInfo(myWeather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            className="search-Term"
            id="search"
            placeholder="search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            search
          </button>
        </div>
      </div>
      //Temp cards
      <WeatherCard weatherInfo={weatherInfo} />
    </>
  );
};

export default Temp;
