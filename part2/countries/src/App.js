import { useEffect, useState } from "react"
import axios from 'axios'
import Country from "./components/Country"

const App = () => { 
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

 
useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => setCountries(response.data))
},[])

  const list = countries.filter(countries => countries.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      find countries 
      <input 
        value={filter}
        onChange={(event) => setFilter(event.target.value) } 
      />

    {
      filter === '' ? [] :
        list.length > 10 ?
        <div>Too many matches, specify another filter</div> :
          list.length > 1 ?
          list.map(country => <div key={country.cca2}>{country.name.common}</div>) :
          <Country country={list[0]} />
    }


      


    </div>
  )
}

export default App