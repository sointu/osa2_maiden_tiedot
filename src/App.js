import React, { useState, useEffect } from 'react'
import axios from 'axios';


function App(props) {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const [que, setQuery] = useState({
    access_key: '3af3870d28abbcf44977cf3d32c34765',
    query: ''
  })
  const [weather, setWeather] = useState('')

  let names = countries.map(a => ((a.name).toLowerCase()))

  const handleSearch = (event) => {
    //console.log(event.target.value)
    let filteredNames = names.filter(element => element.includes((event.target.value).toLowerCase()))
    //console.log(filteredNames)
    setCountries(countries.filter((a) => filteredNames.includes((a.name).toLowerCase())))
    setSearch(event.target.value)
  }

  let q = {}
  const showCountry = (a) => {
    let filteredNames = names.filter(element => element.includes((a).toLowerCase()))
    console.log(filteredNames)
    setCountries(countries.filter((x) => filteredNames.includes((x.name).toLowerCase())))
    let foo = countries.filter((x) => filteredNames.includes((x.name).toLowerCase()))
    console.log(foo)
    console.log(foo[0].capital)
    /*setQuery({
      access_key: "3af3870d28abbcf44977cf3d32c34765",
      query: `${foo[0].capital}`
  })*/
  /*
   q = {
    access_key: "3af3870d28abbcf44977cf3d32c34765",
    query: `${foo[0].capital}`
   }
   */
   q = `?access_key=3af3870d28abbcf44977cf3d32c34765&query=${foo[0].capital}`
   
   console.log(q)

  }

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log('promise fullfilled')
        //console.log(response)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const hook2 = () => {
    console.log('effect')
    axios
      .get('http://api.weatherstack.com/current'+q)
      .then((response) => {
        console.log('promise 2 fullfilled')
        console.log(q)
        setWeather(response.data)
      })
  }

  useEffect(hook2, [])


  const rows = () => {
    return countries.map(country =>
      <p key={country.name}>
        {country.name}&nbsp;
            <button onClick={() => showCountry(country.name)}>info</button>
      </p>
    )
  }

  const languages = (country) => {
    return country.languages.map(language =>
      <li key={language.name}>
        {language.name}
      </li>
    )
  }

  const country = () => {
    return countries.map(country =>
      <div key={country.name}>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>{languages(country)}</ul>
        <img src={country.flag} alt={country.name} width="100px" border="1" />
      </div>
    )
  }

  if (countries.length > 10 && countries.length < 250) {
    return (
      <div>
        <input
          value={search}
          onChange={handleSearch}
        />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  if (countries.length > 1 && countries.length < 10) {
    return (
      <div>
        <input
          value={search}
          onChange={handleSearch}
        />
        {rows()}
      </div>
    )
  }

  if (countries.length === 1) {
    return (
      <>
        <input
          value={search}
          onChange={handleSearch}
        />
        {country()}
      </>
    )
  }

  return (
    <div>
      Find countries&nbsp;
      <input
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

export default App;
