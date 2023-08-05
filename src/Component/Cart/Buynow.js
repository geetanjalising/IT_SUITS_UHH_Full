import { React, useEffect, useState } from 'react'
import { Divider } from '@mui/material'
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';
import { NavLink } from "react-router-dom";
import "./Buynow.css"
import { BASE_URL } from "../../helper.js";

const Buynow = () => {
  const [cartdata, setCartdata] = useState("");
  //console.log(cartdata.length);

  const getdatabuy = async () => {
    const res = await fetch(`${BASE_URL}/cartdetails`, {
      method: "POST",
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
    //  console.log("Response   line");
    const data = await res.json();
    //   console.log(data.carts);
    // console.log("rfvbgte")

    if (res.status !== 201) {
      // console.log("no data availabele")
      alert("no data available")
    } else {
      // console.log("data cart main hain");
      setCartdata(data.carts);
    }
  };



  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
      {cartdata.length ?  //if(cartdata is not empty)
        <div className='buynow_section'>
          <div className='buynow_container'>
            <div className='left_buy'>
              <h1>Shopping Cart</h1>

              <span className="leftbuyprice">Price</span>
              <Divider />

              {
                cartdata.map((e, k) => {   //travsersing cart data
                  return (
                    <>
                      <div className='item_container' key={k}>
                        <NavLink to={`/addcart/${e.id}`}> <img src={e.url} alt="imgitem" /></NavLink>
                        <div className='item_details'>
                          <h3>{e.title.longTitle}</h3>
                          <h3>{e.title.shortTitle}</h3>
                          <h3 className='differentprice'>₹{e.price.cost}.00</h3>

                          <Option deletedata={e.id} />
                        </div>
                        <h3 className='item_price'>₹{e.price.cost}</h3>
                      </div>
                      <Divider />
                    </>
                  )
                })

              }

              <Subtotal item1={cartdata} />
            </div>
            <Right item1={cartdata} />
          </div>
        </div> : ""
      }
    </>
  );
};

export default Buynow;
