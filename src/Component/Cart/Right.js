import {React, useState, useEffect} from 'react'
import "./Buynow.css"
import { NavLink } from 'react-router-dom';

const Right = ({item1}) => {
  const [price,setPrice]=useState(0);
  
  useEffect(()=>{
    totalAmount();  
  },[item1])

  const totalAmount =()=>{
    let price=0;
    item1.map((item)=>{
      price+=item.price.cost
    },[]);
    setPrice(price)
  }

  return (
    <div className='right_buy'>
     
      <div className='cost_right'>
        
        <span style={{color:"#595959"}}>Select this option to buy all the cart items.
        </span>
        <h3>Subtotal ({item1.length} item):</h3>
        <br/>
        <span style={{fontweight:700}}>{price}.00</span>
        <br/>
        <br/>
        <NavLink to="/payment"><button className='cart_btn1'>Pocess To Buy</button></NavLink>
     
      </div>
    </div>
  )
}

export default Right
