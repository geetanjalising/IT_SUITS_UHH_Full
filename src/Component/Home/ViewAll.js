import React from 'react'
import { NavLink } from "react-router-dom";
import "./ViewAll.css"
import {BASE_URL} from "../../helper.js";


const ViewAll = ({ products }) => {
  return (
    <div className='bd'>
     <div className='head'>
      <h1>Today's Deals</h1>
     </div>

         <div className='product_section2'>
       {
          products.filter(item=>!item.id.includes('@')).map((e) => {
            return (
              <>
             
                <NavLink to={`/addcart/${e.id}`} style={{textDecoration:"none"}}>
                  <div className='products_items2'>
                    <div className='product_img2'>
                      <img src={e.url} alt="product_item" />
                    </div>
                    <div className='para'>
                      <p className='products_name2' >{e.title.shortTitle}</p>
                      <p className='products_offer2'>{e.discount}</p>
                      <p className='products_explore2'>{e.tagline}</p>
                    </div>
                  </div>
                </NavLink>
              </>
            )
          })
        }
     
    </div>
   
    </div>
  )
}

export default ViewAll