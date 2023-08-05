import {React,useContext} from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../../Context/ContextProvider';
import { NavLink } from 'react-router-dom';
import {BASE_URL} from "../../helper.js";


const Option = ({deletedata}) => {
  console.log(deletedata);

  const {account, setAccount}=useContext(LoginContext);
  const removedata=async(req,res)=>{
    try{
    const res = await fetch(`${BASE_URL}/remove/${deletedata}`, {
      method: "DELETE",
       headers: {     
         Accept: "application/json",
         "Content-Type": "application/json",
         withCredentials: true
       },
       body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
       credentials: "include"
     });  
    
     const data = await res.json();
      //console.log(data);

      if(res.status===400 || !data){
        console.log("error");
      }else{
        //console.log("user delete");
        toast.success("item removed from cart", {
          position: "top-center",
        })
        setAccount(data);  //setAccount data beacause whenever login show the data
   
        window.location.href = "./buynow";
      }
    } catch(error){
      console.log("error");
    }
  }
  return (
    <div className='add_remove'>
      

      <button className='cart_btn1' onClick={()=>removedata(deletedata)}>Delete</button>
      <NavLink to="/payment"><button className='cart_btn1'>Buy Now</button></NavLink>
      <ToastContainer/>
     
    </div>
  )
};

export default Option;
