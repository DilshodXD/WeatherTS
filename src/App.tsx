import { HTMLAttributes, useEffect, useState } from "react";
import { Weather } from "./interface/interface";
import "./index.css";

const api = {
  key: "1593a9e19a69f703e1cd53526819dd8a",
  base: "https://api.openweathermap.org/data/2.5/",
  img: "https://openweathermap.org/img/wn/",
};

("01d@2x.png");

function App(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<Weather>();

  const dateBuilder = (d: Date): string => {
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

    return `${day} ${date} ${month}`;
  };

  useEffect((): void => {
    fetch(`${api.base}weather?q=Tashkent&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  const handleInfo = (): void => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .then((data) => setWeather(data));
  };

  return (
    <div className="bg">
      <div className="container">
        <div className="inner">
          <div className="search-bar">
            <input
              className="search-bar-inner fontColor"
              type="text"
              placeholder="Enter city name..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button onClick={handleInfo} className="search-bar-inner fontColor">
              Search
            </button>
          </div>
          <div className="date fontColor">{dateBuilder(new Date())}</div>
          <div className="location fontColor">
            {weather?.name} {weather?.sys.country}
          </div>
          <div className="temp">
            <p className="temp-inner fontColor">
              {weather?.main.temp ? Math.round(weather?.main.temp) : ""}°c
            </p>

            <div className="img">
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                alt={weather?.weather[0].main}
              />
              <p className="img-text fontColor">{weather?.weather[0].main}</p>
            </div>
          </div>
          <p className="humidity fontColor">
            Humidity {weather?.main.humidity}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
