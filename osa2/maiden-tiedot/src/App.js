import {useEffect, useState} from 'react';
import Search from './components/Search.js';
import Countries from './components/Countries.js';
import countryService from './services/countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('getCountries effect');
    countryService
      .getCountries()
      .then(initialCountries => {
        console.log('country promise fulfilled');
        setCountries(initialCountries);
      })
  }, []);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const countriesToShow = search
    ? countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    : countries;

  return (
    <div>
      <h2>Search for country</h2>
        <Search search={search} handleSearch={handleSearch} />
        <Countries countries={countries} countriesToShow={countriesToShow} 
        handleSearch={handleSearch} />
    </div>
  );
};

export default App;
