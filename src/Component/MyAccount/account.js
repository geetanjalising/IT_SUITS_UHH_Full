import React, { useEffect, useState } from "react";
import UserHome from './userHome';
import {BASE_URL} from "../../helper.js";
import AdminHome from "./adminHome";

const Account = () => {
    const [userData, setUserData] = useState("");
    useEffect(() => {
        fetch(`${BASE_URL}/userData`, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email:window.localStorage.getItem("email"),
            token: window.localStorage.getItem("token"),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            
    
          setUserData(data.data);
          //console.log("data.data--->");
          //console.log(data);
          //window.localStorage.setItem("name",data.data.fname)
            if (data.data === "token expired") {
              alert("Token expired login again");
              window.localStorage.clear();
              window.location.href = "./sign-in";
            }
          });
      }, []);
      
  return (
    <> 
    {/* {console.log(userData)} */}
  { 
  userData.email==="geetanjalisingh1815@gmail.com"?<AdminHome/>
    :<UserHome userData={userData}/>}
  </>
  )
}

export default Account