import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>
                Capital: {country.capital}<br />
                Area: {country.area} km2
            </p>
            <p>
                <b>Languages:</b>
            </p>
            <ul>
                {country.languages.map((language) =>
                    <li key={language.name}>
                        {language.name}
                    </li>
                )}
            </ul>   
            <img src={country.flags.png} alt='country flag' />
            <WeatherInfo capital={country.capital} />
        </div>
    )
}

export default CountryInfo;