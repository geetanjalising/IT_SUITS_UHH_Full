import React, { useEffect } from 'react'
import Home1 from "./Homee1.js"
import Home2 from "./Homee2.js"
import Home3 from "./Homee3.js"
import { getproducts } from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import pic1 from "./discount.jpg"
import "./Home.css"

const Home = () => {
  const { products } = useSelector(state => state.getproductsdata);
  //console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  return (
    <div className='homebody'>
      <Home1 />

      <div className='products_deal'>
        <h3>Deal of the Day</h3>
        <NavLink to="/viewAll">
          <button className='view_btn'>View All</button>
        </NavLink>
      </div>
      <hr style={{ color: "black" }}></hr>

      <div style={{ marginBottom: "10px" }}>
        <Home2 products={products} />
      </div>

    <div className='products_deal1'>
        <h2>Styles For You!</h2>
        <NavLink to="/styles">
          <button className='view_btn1'>View All</button>
        </NavLink>
      </div>
      <hr style={{ color: "black" }}></hr>
      <Home3 products={products} />

      <div className='discountimg'>
        <img src={pic1}></img>
      </div>


      <div className='products_deal'>
        <h3>Home Accessories</h3>
        <NavLink to="/viewAll">
          <button className='view_btn'>View All</button>
        </NavLink>
      </div>
      <hr style={{ color: "black" }}></hr>
      <div style={{ marginBottom: "10px" }}>
        <Home2 products={products} />
      </div>
    </div>
  )
}

export default Home