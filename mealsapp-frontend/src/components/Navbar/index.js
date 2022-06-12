import React, {useContext} from 'react';
import {Navbar, Container, Nav,NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { myContext } from '../../contex';
import axios from '../../Axios';
import { useNavigate } from 'react-router-dom';
function NavBar() {
const navigate = useNavigate();
  const {user, setUser} = useContext(myContext );

  const handleLogout = () =>{//logout func
      axios.post('/logout').then(()=>{
      localStorage.removeItem('token');
      setUser(null);
      navigate("/");
      });
  };


  return (
   <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="home">Meals</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">

      {!user && (
      <Nav className="me-auto">
      <LinkContainer to="/login">
                <Nav.Link href="login">Login</Nav.Link>
        </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link href="signup">SignUp</Nav.Link>
        </LinkContainer>
      </Nav>
      	)}

        {user &&(
          <>
         <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
       </>
        )}
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default NavBar;