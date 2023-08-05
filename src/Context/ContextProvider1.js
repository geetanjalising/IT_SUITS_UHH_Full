import React, {createContext, useState} from 'react';

export const UserContext = createContext(null);

const ContextProvider1 = ({children}) => {
    const [user,setUser] = useState("");
  return <>
  <UserContext.Provider value={{user,setUser}}>
    {children}
  </UserContext.Provider>
  </>
}

export default ContextProvider1;