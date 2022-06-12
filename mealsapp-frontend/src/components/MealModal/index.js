import React from 'react'
import {useState, useContext} from 'react'
import {Modal, Button,} from 'react-bootstrap';
import { myContext } from '../../contex';
import axios from '../../Axios'
function MealModal({strMeal, strInstructions, idMeal}) {

  const [show, setShow] = useState(false);
   const {user} = useContext(myContext)
  const {setUser} = useContext(myContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


const handleAddFavorites=() =>{
    axios.post('/add-favorites' , {mealId: idMeal}) //sending the id of meal that user want to add to favorites
  .then(({data})=>{
    setUser(data);
    alert('Meal Added to Favorites');
  
  })
  .catch(err =>console.log(err));
};




const handleRemoveFromFavorites=() =>{
    axios.post('/remove-favorites' , {mealId: idMeal}) //sending the id of meal that user want to add to favorites
  .then(({data})=>{
    setUser(data);
    alert('Meal Removed from Favorites');
  
  })
  .catch(err =>console.log(err));
};
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
	      See More
     </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{strMeal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{strInstructions}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          { user&& (
            <>
            {user.favorites.includes(idMeal)?(
                      <Button variant="danger" onClick={handleRemoveFromFavorites}>
                        Remove from favorites</Button>
            ):(
          <Button variant="primary" onClick={handleAddFavorites}>
              Add to Favorites
          </Button>
            )}
          </>
          )}
        </Modal.Footer>
      </Modal>
      </>
  );
}

export default MealModal;