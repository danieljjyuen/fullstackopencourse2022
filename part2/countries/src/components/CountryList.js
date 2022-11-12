import Country from "./Country"

const CountryList = ({countries, filter, setFilter}) => {
  const list = countries.filter(countries => countries.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {
        filter === '' ? [] :
          list.length > 10 ?
          <div>Too many matches, specify another filter</div> :
            list.length > 1 ?
            list.map(country => 
            <div key={country.cca2}>{country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button></div>) :
              list.length === 1 ?
            <Country country={list[0]} />
            : <div></div>
      }
    </div>
  )

}

export default CountryList