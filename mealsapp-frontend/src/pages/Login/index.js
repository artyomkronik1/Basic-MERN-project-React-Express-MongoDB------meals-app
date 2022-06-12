import React,{useContext, useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import { myContext } from '../../contex';
import axios from '../../Axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
     const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
 const {user} = useContext(myContext);
 const {setUser} = useContext(myContext);


    function handleLogin(e){ //login function
    e.preventDefault();
    if(!email || !password){ //checking if email and pass exists
      return alert('Please fill out the fields!')
    }
    axios.post('/login', {email, password}) //then is there exists we post to './users' url the email and pass ---> its req.body for server
    .then(({data} ) =>{
          localStorage.setItem('token', data.token);
          setUser(data);
                navigate("/");
    })
    .catch((err)=> console.log(err));
   }
  return (
    
   <Form onSubmit ={handleLogin}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" 
      onChange={(e)=>setEmail(e.target.value)}
    value={email}
    required/>
    
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
    value={password}
    required />
  </Form.Group>

  <Button variant="primary" type="submit">
    Login
  </Button>
</Form>
  )
}

export default Login;