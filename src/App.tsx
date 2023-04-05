"weather?lat=44.34&lon=10.99&appid";
import "./index.css";
import { useState } from "react";
import {Weather} from './interface/interface'
const api = {
  key: "1593a9e19a69f703e1cd53526819dd8a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App(): JSX.Element {
  const [query, setQuery] = useState("Northampton");
  const [weather, setWeather] = useState({});

  const dateBuilder = (d: Date) => {
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

  const handleInfo = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(data => setWeather(data));
  };


  return (
    <div className="bg">
      <div className="container">
        <div className="inner">
          <div className="search-bar">
            <input
              className="search-bar-inner"
              type="text"
              placeholder="Enter city name..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button onClick={handleInfo} className="search-bar-inner">Search</button>
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="location">{weather.name}, {weather.sys.country}</div>
        </div>
      </div>
    </div>
  );
}

export default App;


