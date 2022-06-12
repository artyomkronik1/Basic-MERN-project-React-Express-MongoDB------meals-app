import React, { useState, useContext} from 'react'
import './styles.css'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

import axios from 'axios';
import { myContext } from '../../contex';



function Jumbotron (){

const [searchInput, setSetSearchInput] = useState(""); //state

const {setMeals} = useContext(myContext); //context - data that any component can get between this context	


function handleSearch(){ 
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then((res)=>res.json())
    .then((data)=>setMeals(data.meals));
      
}

  return (
 <div className="my-jumbotron">
 <h1> Welcome </h1>
 <h2>You can search your favourite meals</h2>
  <div className="button-input">  
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Search for a meal"
      aria-label="Meal Search Input"
      aria-describedby="meal-search-button"
      value={searchInput}	
      onChange= {(e)=>setSetSearchInput(e.target.value)}
    />
    <Button variant="danger" id="meal-search-button" onClick={handleSearch} >
      Button
    </Button>
  </InputGroup>
  </div>
  </div>
  );
}

export default Jumbotron;