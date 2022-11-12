import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})
  useEffect (() => {
    
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
         .then((response) =>{
            setWeather( {
            temp: response.data.current.temp,
            icon: response.data.current.weather[0].icon,
            wind: response.data.current.wind_speed,
            })
          })
    }, [])
 

  return(
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital}
      <br />
      area {country.area}

      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} />

      <h2>Weather in {country.capital}</h2>

      
      
      <div>
        temperature {weather.temp} Fahrenheit
        <br />
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
        <br />
        wind {weather.wind} miles/hr
      </div>
      
    </div>
  )
}

export default Country