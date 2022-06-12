import {useEffect, useContext} from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Error from './pages/Error/error';
import NavBar from './components/Navbar';
import AppContext, { myContext } from './contex';
import {Routes, BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import axios from './Axios';

function App() {
  const {user, setUser} = useContext(myContext);

  useEffect(() => {
    axios.post('/auto-login')
    .then(({data})=> setUser(data));
  }, [])
  

  return (
    <Router>
              <NavBar />
               <Routes>
                    <Route path="/" element={<Home/>} />
                     <Route path="/home" element={<Home/>} />
                     
                     {!user &&( //if there is no user we will show login and sign up routes
                       <>
                      <Route path="/login" element={<Login/>} />
                      <Route path="/signup" element={<SignUp/>} />
                      </>
                      )}
                

                       <Route  element={<Error/>} />
             </Routes>
     </Router>
  );
}

export default App;
