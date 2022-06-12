import { createContext } from "react";
import React, { useState } from 'react'

  export const myContext = createContext();
function AppContext({children}){	
  const [meals, setMeals] = useState([]); //state for meals
  const [user, setUser] = useState(null); //state for users


  return ( //put them into a value and everything into mycontext can get
  <myContext.Provider value={{meals, setMeals, user, setUser}}> 
         {children}
</myContext.Provider>);
}
export default AppContext;