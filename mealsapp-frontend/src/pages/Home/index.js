import React from 'react'
import Jumbotron from '../../components/Jumbotron';
import {useEffect, useState, useContext} from 'react';
import MealsContainer from '../../components/MealsContainer';
import { myContext } from '../../contex';
function Home()  {
  const {meals, setMeals} = useContext(myContext);

   useEffect(()=>{ //getting the data from meals
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
      .then((res)=> res.json())
      .then((data)=>{ setMeals(data.meals);})
        .catch((err)=>console.log(err));
  },[]);



  return (
    <div>
      <Jumbotron/>
      <MealsContainer meals={meals}/>
    </div>
  )
}

export default Home;