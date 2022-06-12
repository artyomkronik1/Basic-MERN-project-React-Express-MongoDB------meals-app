import React from 'react'
import {Card, Button } from 'react-bootstrap';
import MealModal from '../MealModal';

function MealCard({strMeal, strMealThumb,strInstructions, idMeal}) {
  return (
    <div>
  <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={strMealThumb} />
      <Card.Body>
         <Card.Title>{strMeal}</Card.Title>
                       <MealModal strMeal={strMeal} strInstructions={strInstructions} idMeal = {idMeal}/>
         </Card.Body>
</Card>
    </div>
  )
}

export default MealCard