import { Divider } from "@mui/material"
import "./ItemDesc.css"
import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { LoginContext } from '../../Context/ContextProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { BASE_URL } from "../../helper.js";


const Cart = () => {
  const { id } = useParams("");
  //console.log(id);
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const { account, setAccount } = useContext(LoginContext);
  const [idxdata, setidxdata] = useState("");
  const history = useNavigate("");

  // const [reviewdata, setreviewdata] = useState({
  //   review: ""
  // });

  // const adddata = (e) => {
  //   const { name, value } = e.target;
  //   setreviewdata(() => {
  //     return {
  //       ...reviewdata,
  //       [name]: value
  //       // ,
  //       // "name":account.fname
  //     }
  //   })
  // }
  // console.log(reviewdata);

  const getdata = async () => {
    const res = await fetch(`${BASE_URL}/getoneproductdata/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true
      }
    });
    const data = await res.json();
    //console.log(data);

    if (res.status !== 201) {
      console.log("no data available");
    } else {
     // console.log("data available");
      setidxdata(data);
    }
  }

  useEffect(() => {
    setTimeout(getdata, 15)
  }, [id]);


  const addtocart = async (id) => {
    //if(isLoggedIn===true){
    //console.log("ADDCART ID->"+id);
    //console.log(idxdata);
    const checkres = await fetch(`${BASE_URL}/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        withCredentials: true

      },
      body: JSON.stringify({
        idxdata,
        email: window.localStorage.getItem("email"),
        token: window.localStorage.getItem("token"),
      }),
      credentials: "include"
    });

    const data1 = await checkres.json();
    //  console.log(data1);
    // const a=checkres;
    // console.log(a);
    if (checkres.status === 401 || !data1) {
      console.log("user invalid");
      alert("user invalid");
    }
    else {
      //  alert("data added in your cart");

      history("/buynow");
      //    window.location.reload(false);
      setAccount(data1);
    }
    //}
    //  else{
    //   history("/noaccount");
    //  }
  }

//   const handleSubmit = async (id) => {

//     console.log("Heloo");
//     console.log(reviewdata + " " + id);
//     const checkres1 = await fetch(`${BASE_URL}/addreview/${id}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         withCredentials: true
  
//       },
//       body: JSON.stringify({
//         name: account.fname,
//         reviewdata
//       }),
//       credentials: "include"
//     });
//     const data2 = await checkres1.json();
//     //  console.log(data1);
//     // const a=checkres;
//     // console.log(a);
//     if (checkres1.status === 401 || !data2) {
//       console.log("not reviewed");
//       alert("not reviewed");
//     }
//     else {  
//       //  alert("data added in your cart");

//       //    window.location.reload(false);
//       setreviewdata(data2);
// console.log(reviewdata);
//     }
//   }
    return (
      <div className='cart_section'>
        {idxdata && Object.keys(idxdata).length &&
          <div className='cart_container'>
            <div className='left_cart'>
              <img
                src={idxdata.detailUrl}
                alt="cart_img" />
            </div>

            <div className='right_cart'>
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
              <div className='cart_btn0'>
                {
                  account ? <> <button className='cart_btn1' onClick={() => addtocart(idxdata.id)}>Add to Cart</button>
                    <NavLink to="/payment"><button className='cart_btn1'>Buy Now</button></NavLink>
                  </> :
                    <>  <NavLink to="/noaccount"><button className='cart_btn1' >Add to Cart</button></NavLink>
                      <NavLink to="/payment"><button className='cart_btn1'>Buy Now</button></NavLink></>
                }


              </div>
              {/* <form>
                <label htmlFor="review">
                  review</label>
                <input type="text"
                  onChange={adddata}
                  value={reviewdata.review}
                  name="review" id="review"
                />
                 {console.log(idxdata.id)} 
                {
                  account ?
                    <button onClick={() => handleSubmit(idxdata.id)}>Submit</button>
                    :
                    <NavLink to="/noaccount"><button>Submit</button></NavLink>
                }

              </form> */}
              {/* {console.log(idxdata.review)}
              {idxdata.review ?
                <div>
                  <h1>Reviews</h1>
                  {
                    idxdata.review.map((itr) => {
                      return (
                        <>
                          <h3>{itr.review}-----{itr.name}</h3>

                          {console.log(itr.review)}
                        </>
                      )
                    }

                    )
                  }
                </div>
                : ""} */}
            </div>
          </div>
        }
        {!idxdata ? <div className='circle'>
          <CircularProgress />
          <h2>Loading...</h2>
        </div> : ""}
      </div>
    )
  };

export default Cart