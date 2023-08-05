import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Divider } from "@mui/material"
//import {products} from "./productdata"
import { NavLink } from "react-router-dom";
import './Homee2.css';
import {BASE_URL} from "../../helper.js";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 2000 },
    items: 8
  },
  desktop: {
    breakpoint: { max: 2000, min: 1500 },
    items: 5
  },
  chhotadesktop:{
    breakpoint: { max: 1500, min:700 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 700, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Homee2 = ({ products }) => {
  //console.log(products[0].id);
  return (
    <div className='product_section'>
      
      <Divider />
      <Carousel
        containerClass="carousel-container"
        infinite={true}
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        //  removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {
          products.filter(item=>!item.id.includes('@')).map((e) => {
            return (
              <>
                <NavLink to={`/addcart/${e.id}`} style={{textDecoration:"none"}}>
                  <div className='products_items'>
                    <div className='product_img'>
                      <img src={e.url} alt="product_item" />
                    </div>
                    <div className='para'>
                      <p className='products_name'>{e.title.shortTitle}</p>
                      <p className='products_offer'>{e.discount}</p>
                      {/* <p className='products_explore'>{e.tagline}</p> */}
                    </div>
                  </div>
                </NavLink>
              </>
            )
          })
        }
      </Carousel>
    </div>
  )
}

export default Homee2