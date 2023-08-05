import React,{useContext} from 'react'
 import {NavLink} from 'react-router-dom'
 import {ToastContainer, toast} from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { LoginContext } from '../../Context/ContextProvider';


const Payment = () => {
  const { account, setAccount } = useContext(LoginContext);
    const handleSubmit=()=>{
        toast.success("Thanks for Shopping with Us!", {
            position: "top-center",
           })
          
    }
  return (
    <div>
   <section>
        <div className='sign_container'>
        <div className='sign_form'>
            <form>
              <h1>Fill the details for payment:</h1>
             
              <div className='form_data'>
                <label htmlFor='fname'>Your Name: &nbsp;</label>
                <input type="text" 
                name="fname" id="fname"/>
              </div>
              <div className='form_data'>
                <label htmlFor='email'>Email:&nbsp;</label>
                <input type="text" 
                name="email" id="email"/>
              </div>
              <div className='form_data'>
                <label htmlFor='number'>Mobile:&nbsp;</label>
                <input type="text" 
                name="mobile" id="mobile"/>
              </div>
              <div className='form_data'>
              <label htmlFor='number'>Adress:&nbsp;</label>
                <input type="text" 
               name="address" id="adress"/>
              </div>
              <div className='form_data'>
              <label htmlFor='number'>PIN CODE:&nbsp;</label>
                <input type="text" 
               name="pin code" id="pincode"/>
              </div>
             
             {
              account?  <NavLink to="/">  <button className='signin_btn' 
               onClick={handleSubmit}
              >Place Order</button></NavLink>:
              <NavLink to="/noaccount"><button className='signin_btn' 
              >Place Order</button></NavLink>
             }
          
             
            </form>
          </div>
          <ToastContainer/>
        </div>
      </section>
    </div>
  )
}

export default Payment