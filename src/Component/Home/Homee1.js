import React from 'react'
import Carousel from 'react-material-ui-carousel';
import "./Homee1.css"
import pic1 from "./images.jpg"
import pic2 from "./Cartoon.png"
import pic3 from "./fashion.jpg"
import pic4 from "./cart_gif.gif"
import pic5 from "./fashion2.jpeg"

const data=[
   pic1,pic2,pic3,pic4,pic5
]

const Home1 = () => {
return (
 <Carousel
  className='carousel'
  indicators={false}
  autoPlay={true}
  animation='slide'
  cycleNavigation={true}
 >
   {
    data.map((imag,i)=>{
      return (
        <>
        <img src={imag} alt="" className='carousel_img'/>
        </>
      )
    })
   }
 </Carousel>
  )
}

export default Home1