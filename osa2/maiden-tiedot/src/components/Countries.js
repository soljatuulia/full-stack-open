import CountryInfo from "./CountryInfo"

const Countries = ({ countries, countriesToShow, handleSearch, weather }) => {
    if (countriesToShow.length === countries.length) {
        return (
            <div></div>
        )
    } else if (countriesToShow.length > 10) {
        return (
            <div>
                <p>
                    Too many matches, specify your search.
                </p>
            </div>
        )
    } else if (countriesToShow.length > 1 &&
        countriesToShow.length <= 10) {
        return (
            countriesToShow.map(country =>
                <div key={country.name}>
                    <p>
                        {country.name}
                        <button type='button' value={country.name} onClick={handleSearch}>
                            show
                        </button>
                    </p>
                </div>
            )
        )
    } else if (countriesToShow.length === 1) {
        return (
            <div>
                {countriesToShow.map(country => (
                    <CountryInfo key={country.name} country={country} weather={weather}/>
                ))}
            </div>
        )
    }
};

export default Countries;