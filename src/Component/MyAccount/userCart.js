import React, {useContext,useState} from "react";
import { Divider } from "@mui/material";
import { useLocation } from 'react-router-dom'
import "./userCart.css"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../helper.js";
// import { UserContext } from '../../Context/ContextProvider1';
// import { LoginContext } from '../../Context/ContextProvider';

  
export default function UserCart() {
   // const { account,setAccount } = useContext(LoginContext);
    //console.log(account);
   // const { user,setUser } = useContext(UserContext);
  // console.log("hello");
  //   console.log(user);
 

    let location = useLocation();
    const User = location.state;
    const data=User.carts;
    //console.log(location);



    const removeItem=async(idx)=>{
        //console.log(idx);
        try{
        const res = await fetch(`${BASE_URL}/removeItembyAdmin/${idx}`, {
          method: "DELETE",
           headers: {     
             Accept: "application/json",
             "Content-Type": "application/json",
             withCredentials: true
           },
           body: JSON.stringify({
            email:User.email
          }),
           credentials: "include"
         });  
        
         const data = await res.json();
         //console.log(data);
    
          if(res.status===400 || !data){
           // console.log("error");
          }else{    
            //console.log("user delete");
             toast.success("item removed from cart", {
              position: "top-center",
            })
            //setAccount(data);  //setAccount data beacause whenever login show the data
           //setUser(data);
            window.location.href = "./account";
          }
        } catch(error){
          //console.log("error");
        }
      }

    return (
        <div className="cart_section1">
            <h1>Users Cart</h1>
            {/* {console.log(data)} */}
            {
                data.length ? <>
                   
                    {
                        data.map((idxdata) => {
                           return(
                            <>
                            <Divider/>
                            <div className='cart_container1'>
                                <div className='left_cart1'>
                                    <img
                                        src={idxdata.detailUrl}
                                        alt="cart_img" />
                                </div>

                                <div className='right_cart1'>
                                    <h3>{idxdata.title.shortTitle}</h3>
                                    <h4>{idxdata.title.longTitle}</h4>
                                    <Divider />
                                    <p className="mrp">M.R.P. : ₹{idxdata.price.mrp}</p>
                                    <p>{idxdata.tagline}<span style={{ color: "#B12704" }}> ₹{idxdata.price.cost}</span></p>
                                    <p>Your Save:<span style={{ color: "#B12704" }}>₹{idxdata.price.mrp - idxdata.price.cost}</span></p>

                                    <div className="discount_box">
                                        <h5>Discount : <span style={{ color: "#111" }}>{idxdata.discount}</span> </h5>
                                        <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                                        <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                                    </div>
                                    <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{idxdata.description}</span></p>
                                </div>
                             
                                <button className="delete_btn" onClick={()=>removeItem(idxdata.id)}>Delete Item</button>
                            </div> 
                           
                            </>   
                           )
                        })
                   }
                 </>
               :""
            }
            <ToastContainer/>
        </div>

            );
}