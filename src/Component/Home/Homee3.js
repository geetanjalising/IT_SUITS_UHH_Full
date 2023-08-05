import React from 'react'
import { NavLink } from "react-router-dom";
import "./Homee3.css"
import {BASE_URL} from "../../helper.js";


const Homee3 = ({ products }) => {
  return (
    <div>
         <div className='product_section2'>
       {
          products.filter(item=>item.id.includes('@')).map((e) => {
            return (
              <> 
             <NavLink to={`/addcart/${e.id}`} style={{textDecoration:"none"}}>
                  <div className='products_items2'>
                    <div className='product_img2'>
                      <img src={e.url} alt="product_item" />
                    </div>
                    <div className='para2'>
                      <p className='products_name2'>{e.title.shortTitle}</p>
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

export default Homee3