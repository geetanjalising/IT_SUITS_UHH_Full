import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Noaccount.css";

 const Noaccount = () => {
  return (
    <div className='noaccount_body'>
        <h1>Please sign in to continue...</h1>
     <NavLink to="./signin"><button>Sign In</button></NavLink>
    </div>
  )
}
export default Noaccount;
