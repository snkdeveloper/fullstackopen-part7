import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [countries, setCountries] = useState([]) 
  const [country, setCountry] = useState(null)
  const hook = () => {
   
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
       
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  
  // useEffect(() => {})
  //
  // for(let country in countries){
  //  
  // }
  const find = () =>{
    let countryToShow = null
  for(var i = 0;i < countries.length;i++){
    if(countries[i].name.common.toLowerCase()===name.toLowerCase()){
      countryToShow = countries[i]
    }
      
  }
  let country2 = null
  if(name===''){
    return null
  }
 
 
  if(countryToShow==null){
     country2 = {
      data:null,
      found:false
    }
    return country2
  }
 
  if(countryToShow!=null){
    country2 ={
      data:{
        name:countryToShow.name.common,
        capital:countryToShow.capital,
        population:countryToShow.population,
        flag:countryToShow.flags.png
      },
      found:true
    }
    return country2
  }
  }
  return{
    find
  }
}

const Country = ({ country }) => {
 
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const rcountry = useCountry(name)
  const country = rcountry.find()


  const fetch = (e) => {
    e.preventDefault()
    
    setName(nameInput.value)
    
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App