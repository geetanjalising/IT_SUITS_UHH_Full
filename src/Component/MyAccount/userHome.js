import React from "react";
import "./userHome.css";
import { NavLink } from "react-router-dom";

export default function UserHome({ userData }) {
  // window.localStorage.setItem("name",userData.fname);
  //console.log(userData);
  const logout = () => { 
    window.localStorage.clear();
    window.location.href = "./";
  }

  return (
    <div className="main">
   
      <br></br>
      <div className="userBd">

        <div className="userBd2">
          Username: 
         <h1>{userData.fname}</h1> 
          Email: 
         <h1> {userData.email}</h1>
          Mobile:
          <h1> {userData.mobile}</h1>
          Address:
          <h1> {userData.address}</h1>
          Pin Code:
          <h1> {userData.pincode}</h1>
          <div className="userbtn">
          <button className="btnlogout1" onClick={logout}>LogOut</button>
         <NavLink to="/buynow"> <button className="btnlogout1" >My Cart</button></NavLink>
         </div>
        </div>

      </div>
      </div>

      );
}