
const Country = ({country}) => {

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

    </div>
  )
}

export default Country