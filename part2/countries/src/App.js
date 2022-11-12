import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from "./components/Country"
import Filter from "./components/Filter"
import CountryList from './components/CountryList'

const App = () => { 
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
 
useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => setCountries(response.data))
},[])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <CountryList countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App