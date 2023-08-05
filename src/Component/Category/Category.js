import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import "./Category.css";
const Category = ({products}) => {
   const [item,setitem]=useState(products);
   
   const ladiesItem=()=>{
    const updatedItems=products.filter(item=>item.id.includes('$'));
    setitem(updatedItems);
   }
   const fashionItem=()=>{
    const updatedItems=products.filter(item=>item.id.includes('@'));
    setitem(updatedItems);
   }
   const mensItem=()=>{
    const updatedItems=products.filter(item=>item.id.includes('_'));
    setitem(updatedItems);
   }
   const kidsItem=()=>{
    const updatedItems=products.filter(item=>item.id.includes('*'));
    setitem(updatedItems);
   }
   const allItem=()=>{
    setitem(products);
   }
   const accessoriesItem=()=>{
    const updatedItems=products.filter(item=>!item.id.includes('@'));
    setitem(updatedItems);
   }
  return (
    <div className='mainbd'>
      <h1>Shop By Category</h1>
    <div className='category_body'>
    <div  className='buttons'>
        <div className='radio'><input type="radio" value="1"  name="category" onClick={()=>allItem()}/><label>All </label></div>
        <div className='radio'> <input type="radio" value="2" name="category" onClick={()=>accessoriesItem()}/><label>Home Accessories</label></div>
        <div className='radio'> <input type="radio" value="3" name="category" onClick={()=>fashionItem()}/><label>Fashion</label></div>
        <div className='radio'>  <input type="radio" value="4" name="category" onClick={()=>mensItem()}/><label>Mens</label></div>
        <div className='radio'>  <input type="radio" value="5" name="category" onClick={()=>ladiesItem()}/><label>Ladies</label></div>
        <div className='radio'>  <input type="radio" value="6" name="category" onClick={()=>kidsItem()}/><label>kids</label></div>
     </div>
     <hr/>
    <div className='product_section2'>
    {
      
         item.map((e) => {
            return (
              <>
              <NavLink to={`/addcart/${e.id}`} style={{textDecoration:"none"}}>
                  <div className='products_items2'>
                    <div className='product_img2'>
                      <img src={e.url} alt="product_item" />
                    </div>
                    <div className='para'>
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
    </div>
  )
}

export default Category