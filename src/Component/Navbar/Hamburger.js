import { React, useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import { LoginContext } from '../../Context/ContextProvider';
import "./Hamburger.css"
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import pic from "./logo.png"


const Hamburger = ({ close, Logclose }) => {
  const { account, setAccount } = useContext(LoginContext);
  const [dropen, setdropen] = useState("");
  const navigate = useNavigate("");

  const logoutuser =  () => {

    window.localStorage.clear();
    window.location.href = "./";
    }


  return (
    <>
      <div className='hamburger1'>
        <img src={pic}></img>

        {
          account ?<NavLink to="/account" style={{textDecoration:"none"}}> <Avatar className="avtar1">{account.fname[0].toUpperCase()}</Avatar></NavLink> :
            <Avatar className="avtar1" />
        }


        {account ? <h2>Helloo, {account.fname.toUpperCase()}</h2> : ""}


        <div className='navbtn' onClick={() => close()}>
          <NavLink to="/" id='element'>Home</NavLink>
          <NavLink to="/category" id='element'>Shop By Category</NavLink>
          <Divider style={{ width: "100%", marginLeft: "-20px" }} />
          <NavLink to="/viewAll" id='element'>Today's Deal</NavLink>
          {
            account ? <NavLink to="/buynow" id='element'>Cart Items</NavLink> : <NavLink to="/noaccount" id='element'>Cart Items</NavLink>
          }
          <Divider style={{ width: "100%", marginLeft: "-20px" }} />
          <NavLink to="/contact" id='element'>Contact Us</NavLink>
          {
            account ? <div className='logout'>
             
              <h3 style={{ cursor: "pointer", fontWeight: 500 }} onClick={logoutuser} id='element'> <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} id='element'/>Logout</h3>
            </div> :
              <NavLink to="/signin" id='element'>SignIn</NavLink>
          }


        </div>
      </div>
    </>
  )
}

export default Hamburger
