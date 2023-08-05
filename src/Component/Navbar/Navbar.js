import React, { useContext, useEffect, useState } from 'react'
import { FcSearch } from "react-icons/fc"
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import "./Navbar.css"
import { LoginContext } from '../../Context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Hamburger from "./Hamburger";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import pic from "./logo.png"
import {BASE_URL} from "../../helper.js";


const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  //console.log("account"+account);
  const getdetailvaliduser = async () => {
    const res = await fetch(`${BASE_URL}/validuser`, {
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
    const data = await res.json();

    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data from navbar " + data);

      setAccount(data);
    }
  };

  useEffect(() => {
   getdetailvaliduser()
  }, []);

  const [drawer, setdrawer] = useState(false);

  const draweropen = () => {
    setdrawer(true);
  }
  const drawerclose = () => {
    setdrawer(false);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate("");

  const logoutuser = () => {
    window.localStorage.clear();
    window.location.href = "./";
    }
  
  //for searchbar
  const [searchtext, setText] = useState("");
  console.log(searchtext);

  const [searchliopen, setliopen] = useState(true);

  const { products } = useSelector(state => state.getproductsdata);

  const getText = (items) => {
    setText(items);
    setliopen(false);
  }

  return (
    <>
      <div className='navbar'>

        <div className='leftnav'>
          <NavLink to="/" style={{ textDecoration: 'none' }}><img src={pic}></img></NavLink>
        </div>

        <div className='middlenav'>
        <div className='search'>
            <input type="search" onChange={(e) => getText(e.target.value)} placeholder="Search" />
            <div className='search_icon'><FcSearch /></div>
            {
              searchtext &&
              <List className='extrasearch' hidden={searchliopen}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(searchtext.toLowerCase())).map(product => (
                    <ListItem>
                      <NavLink to={`/addcart/${product.id}`} onClick={() => setliopen(true)}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))
                }
              </List>
            }
          </div>
        </div>

        <div className='rightnav'>
        <div className='rightleft'>
         
          {
            !account ? <div className='signin'>
              <NavLink to="/signin" id='sign'>SignIn</NavLink>
            </div> : ""
          }


         
              <NavLink to="/buynow">
                <div className='cart_btn'>
                {
            account ?
                  <Badge color='primary' badgeContent={account.carts.length}>
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                  :  <Badge color='primary' badgeContent={0}>
                  <ShoppingCartIcon id="icon" />
                </Badge>
       }
                </div>
              </NavLink>
                
          {
            account ? <Avatar className="avtar"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
              {account.fname[0].toUpperCase()}
            </Avatar> : ""
          }
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            disableScrollLock={true}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem style={{padding:"10px"}} ><NavLink to="/account" style={{textDecoration:"none",color:"black"}}>My account</NavLink></MenuItem>
            {
              account ? <div className='cli' onClick={logoutuser}><MenuItem onClick={handleClose} ><LogoutIcon style={{ fontSize: 16, marginLeft:"9px" }} />Logout</MenuItem></div> : ""
            }
          </Menu>
           </div>
           <div className='rightright'>
          <IconButton className='hamburger' onClick={draweropen}>
            <MenuIcon className='menu1'/>
          </IconButton>
          
          <Drawer open={drawer} onClose={drawerclose}>
            <Hamburger close={drawerclose} className="ham" />
          </Drawer>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Navbar