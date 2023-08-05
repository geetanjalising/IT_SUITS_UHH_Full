import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../../Context/ContextProvider';
import "./sign.css"
import {BASE_URL} from "../../helper.js";


const Signin = () => {

  const [userdata, setuserdata] = useState({
    email: "",
    password: ""
  });

  const { account, setAccount } = useContext(LoginContext);

  const adddata = (e) => {
    const { name, value } = e.target;
    setuserdata(() => {
      return {
        ...userdata,
       [name]: value
      }
    })
  }
console.log(userdata);
 
const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = userdata;
    const res = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true

      },
      body: JSON.stringify({
        email, password
      }) 
    }); console.log("Hello");
    const data = await res.json();
    //console.log(data);
    if (res.status === 400 || !data) {
      console.log("invalid details");
      toast.warn("invalid details", {
        position: "top-center",
      })
    }
    else {
   //   console.log("datavalid");
     //  console.log(data);
      setAccount(data);
      toast.success("User valid", {
        position: "top-center",
      }) 
      console.log(data.data);
      window.localStorage.setItem("token",data.data);
      window.localStorage.setItem("email", userdata.email)
      window.localStorage.setItem("loggedIn",true);
      setuserdata({ ...userdata, email: "", password: "" });
      //  window.location.reload(false);

     window.location.href = "./";
    }
  }
  
  const [text, setText] = useState("");
  console.log(text);
  const [liopen, setliopen] = useState(true);

  return (
    <>
      <section>
      
        <div className='sign_container'>
          {/* <div className='sign_header'>
            <img src="{pic}" alt="amazonlogo" />
          </div> */}
          <div className='sign_form'>
            <form method='POST'>
              <h1>Sign-In</h1>
              <div className='form_data'>
                <label htmlFor='email'>Email: &nbsp; </label>
                <input type="text"
                  onChange={adddata}
                  value={userdata.email}
                  name="email" id="email" />
              </div>
              <div className='form_data'>
                <label htmlFor="password">Password: &nbsp;</label>
                <input type="password"
                  onChange={adddata}
                  value={userdata.password}
                  name="password" placeholder='At least 6 char' id="password" />
              </div>
              <button className='signin_btn'
                onClick={handleSubmit}
              >Sign In</button>
            </form>  
          </div>
          <div className='create_accountinfo'>
            <p>new To Amazon</p>
            <NavLink to="/register"><button>Create new account</button></NavLink>
          </div>
        </div> 
      </section>
      <ToastContainer />
    </>
  )
}

export default Signin
