

import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home.js'
import Footer from './Component/Footer/Footer'
import Signin from './Component/signup_signin/signin';
import Signup from './Component/signup_signin/signup';
import ItemDesc from './Component/ItemDesc/ItemDesc';
import Buynow from './Component/Cart/Buynow';
import { Routes, Route } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import ViewAll from './Component/Home/ViewAll';
import Styles from './Component/Home/Styles';
import { getproducts } from "./redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import Category from './Component/Category/Category';
import Contact from './Component/Contact/Contact';
import Account from './Component/MyAccount/account';
import Payment from './Component/Payment/Payment';
import NoAccount from './Component/NoAccount/Noaccount';
import UserCart from './Component/MyAccount/userCart'; 
import "./App.css"   

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [ifdata, setData] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 2000)
  }, [])

  const { products } = useSelector(state => state.getproductsdata);
  //console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  return (
    <>
    {
      ifdata?(
        <>

         <Navbar/>
         <div className='rootbd'>
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/signin" element={<Signin />} />
     <Route path="/register" element={<Signup />} />
     <Route path="/addcart/:id" element={<ItemDesc />} />
     <Route path="/noaccount" element= { isLoggedIn === "true" ?<Home />: <NoAccount /> }/> 
     <Route path="/buynow" element= {isLoggedIn === "true" ? <Buynow /> : <NoAccount />}/>
     <Route path="/buynow/signin" element= { <Signin /> }/>
     <Route path="/noaccount/signin" element= { <Signin /> }/>
     <Route path="/viewAll" element={<ViewAll products={products}/>}/>
     <Route path="/styles" element={<Styles products={products}/>}/>
     <Route path="/category" element={<Category products={products}/>}/>
     <Route path="/contact" element={<Contact/>}/>
     <Route path="/account" element= {isLoggedIn === "true" ? <Account /> : <NoAccount />} />
     <Route path="/payment" element= {isLoggedIn === "true" ? <Payment /> : <NoAccount />} />
     <Route path="/payment/signin" element= { <Signin /> }/>
     <Route path="/userCart" element= { <UserCart /> }/>
     
     </Routes> 
     </div>
    
        </> 
      ):(
        <div className='circle'>
        <CircularProgress />
        <h2>Loading...</h2>
        </div>
      )
    }
    <Footer/>
    </>
  );
}

export default App;
