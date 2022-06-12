import React, {useState, useContext} from 'react'
import {Form, Button} from 'react-bootstrap';
import axios from '../../Axios'
import { myContext } from '../../contex';
import { useNavigate } from 'react-router-dom';



function SignUp() {
  const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
 const {user} = useContext(myContext);
 const {setUser} = useContext(myContext);



   function handleSignUp(e){ //signup function
    e.preventDefault();
    if(!email || !password){ //checking if email and pass exists
      return alert('Please fill out the fields!')
    }
    axios.post('/users', {email, password}) //then is there exists we post to './users' url the email and pass ---> its req.body for server
    .then(({data} ) =>{
      setUser(data) 
      localStorage.setItem('token', data.token);
      navigate("/");

    })
    .catch((err)=> console.log(err));
   }




  return (
      <Form onSubmit={handleSignUp}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" 
    onChange={(e)=>setEmail(e.target.value)}
    value={email}
    required

    />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" 
    onChange={(e)=>setPassword(e.target.value)}
    value={password}
    required
    />
  </Form.Group>

  <Button variant="primary" type="submit" >
    SignUp
  </Button>

</Form>

  );
}


export default SignUp;