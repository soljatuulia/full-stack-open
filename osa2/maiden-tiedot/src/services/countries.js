import axios from 'axios';

const getCountries = () => {
    const request = axios.get('https://restcountries.com/v2/all');
    return request.then(response => response.data);
}

const getWeather = (capital) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const request = axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`);
    return request.then(response => response.data);
}

export default { getCountries, getWeather };