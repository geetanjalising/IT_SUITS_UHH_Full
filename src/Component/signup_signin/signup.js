import React,{useState} from 'react'
 import {NavLink} from 'react-router-dom'
 import {ToastContainer, toast} from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import {BASE_URL} from "../../helper.js";


const Signup = () => {
  const [userdata,setuserdata]=useState({
    fname:"",
    email:"",
    mobile:"",
    password:"",
    cpassword:"",
    address:"",
    pincode:""
  });
  
  const adddata=(e)=>{
    const {name,value} = e.target;
    setuserdata(()=>{
      return {
        ...userdata,
        [name]:value
      }
    })
  };
  const handleSubmit=async(e)=>{
  e.preventDefault();
  const { fname, email, mobile, password, cpassword, address, pincode } = userdata;
      
      const res = await fetch(`${BASE_URL}/register`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              withCredentials: true
          },
          body: JSON.stringify({
              fname, email, mobile, password, cpassword, address, pincode
          })
      });

      const data = await res.json();
      // console.log(data);  
       if(res.status===422||!data)
       {toast.warn("invalid details", {
        position: "top-center",
      })
       }
       else{
      // alert("data successfully added")
       toast.success("Successfully Registered!", {
        position: "top-center",
       })
       setuserdata({...adddata,fname:"",email:"",mobile:"",password:"",cpassword:"",address:"",pincode:""});
       window.location.href = "./signin";
       }
    };

  return (
    <>
      <section>
        <div className='sign_container'>
       
          <div className='sign_form'>
            <form method='POST'>
              <h1>Create Account</h1>
             
              <div className='form_data'>
                <label htmlFor='fname'>Your Name: &nbsp;</label>
                <input type="text" 
                 onChange={adddata}
                 value={userdata.fname}
                name="fname" id="fname"/>
              </div>
              <div className='form_data'>
                <label htmlFor='email'>Email:&nbsp;</label>
                <input type="text" 
                 onChange={adddata}
               value={userdata.email}
                name="email" id="email"/>
              </div>
              <div className='form_data'>
                <label htmlFor='number'>Mobile:&nbsp;</label>
                <input type="text" 
                 onChange={adddata}
                 value={userdata.mobile}
                name="mobile" id="mobile"/>
              </div>
              <div className='form_data'>
                <label htmlFor='address'>Address:&nbsp;</label>
                <input type="text" 
                 onChange={adddata}
                 value={userdata.address}
                name="address" id="address"/>
              </div>
              <div className='form_data'>
                <label htmlFor='pincode'>Pin Code:&nbsp;</label>
                <input type="number" 
                 onChange={adddata}
                 value={userdata.pincode}
                name="pincode" id="pincode"/>
              </div>
             
              <div className='form_data'>
                <label htmlFor="password">Password:&nbsp;</label>
                <input type="password" 
                 onChange={adddata}
                 value={userdata.password}
                name="password" placeholder='At least 6 char' id="password"/>
              </div>
              
              <div className='form_data'>
                <label htmlFor="cpassword">Confirm Password:&nbsp;</label>
                <input type="password" 
                 onChange={adddata}
                 value={userdata.cpassword}
                name="cpassword" id="cpassword"/>
              </div>
              <button className='signin_btn' 
               onClick={handleSubmit}
              >Register</button>
              <div className='signin_info'>
                <p>Already have an account?<NavLink to="/signin" style={{textDecoration:"none"}}>Signin</NavLink></p>
                
              </div>
            </form>
          </div>
          <ToastContainer/>
        </div>
      </section>
   </>

  )
}

export default Signup