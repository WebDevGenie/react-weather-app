import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";

const api = {
  key: "fb0f8cfd630ee7897eef784327ec88d0",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="header">
          <div className="logo">
            <img
              src={require("./assets/logo.png")}
              alt="Weather App Logo"
              srcset=""
            />
          </div>
          <div className="appTitle">Weather App</div>
        </div>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                Location: {weather.name}, {weather.sys.country}
              </div>
              <div className="date">Date: {dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                Temp: {Math.round(weather.main.temp)}°C
              </div>
              <div className="feels-like">
                Feels Like {Math.round(weather.main.feels_like)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="recommendation">
                {typeof weather.main != "undefined"
                  ? weather.main.temp < 16
                    ? "It's Cold! You should wear a jacket!"
                    : weather.main.temp > 30
                    ? "Umm... I would stay inside..."
                    : weather.main.temp > 26
                    ? "It's Hot! Wear a singlet!"
                    : "Ahhhh~ Perfect weather!"
                  : ""}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <footer>Created by Eugene Nam</footer>
      </main>
    </div>
  );
}

export default App;
