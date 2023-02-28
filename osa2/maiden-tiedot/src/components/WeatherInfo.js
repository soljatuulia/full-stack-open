import { useEffect, useState } from "react";
import countryService from 'C:/full-stack-open/full-stack-open/osa2/maiden-tiedot/src/services/countries.js';

const WeatherInfo = ({ capital }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        console.log('getWeather effect');
        countryService
        .getWeather(capital)
        .then(weatherData => {
            console.log('Weather promise fulfilled');
            setWeather(weatherData);
            console.log(weatherData);
        })
    }, []);
   
    return (
        <div>
        <h3>Weather in {capital}</h3>
        <p>
            temperature {weather.current.temperature} Celcius<br />
            <img src={weather.current.weather_icons[0]} alt='weather icon' /><br />
            wind {weather.current.wind_speed} m/s
        </p>
        </div>
    );
};

export default WeatherInfo;