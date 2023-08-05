import React, { useEffect, useState } from 'react'

const Subtotal = ({item1}) => {

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
    <div className='sub_item'>
      <h3>Subtotal ({item1.length} items): <strong style={{fontWeight:700,color:"#111"}}>₹{price}.00</strong></h3>
    </div>
  )
}

export default Subtotal;
