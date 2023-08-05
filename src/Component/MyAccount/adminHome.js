import React, { useEffect, useState,useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AdminHome.css"
import {BASE_URL} from "../../helper.js"
import { NavLink} from "react-router-dom";
import { UserContext } from '../../Context/ContextProvider1';

export default function AdminHome() {
    const [data, setData] = useState([]);
    const { user,setUser } = useContext(UserContext);
  //console.log(user);
    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = () => {
        fetch(`${BASE_URL}/getAllUser`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
               // console.log(data, "userData");
                setData(data.data);
                //setUser(data.data);
            });
    }
    const logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    }

    const deleteUser = (id, name) => {
        if (window.confirm(`Are u sure u want to delete ${name}`)) {

            fetch(`${BASE_URL}/deleteUser`, {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    toast.success(`Deleted Successfully!`, {
                        position: "top-center",
                    })
                    //alert(data.data);
                    getAllUser();
                });
        }
        else {

        }
    };
   
    return (
        <div className="adminbd">
            <h1>Welcome Admin</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Pin Code</th>
                    <th>Cart</th>
                    <th>Delete</th>
                </tr>
                {data.map((i) => {
                  
                    return (
                        <tr>
                            <td>{i.fname}</td>
                            <td>{i.email}</td>
                            <td>{i.mobile}</td>
                            <td>{i.address}</td>
                            <td>{i.pincode}</td>
                            <td>
                            <NavLink to= '/userCart'  state={i}>
                                    <button className="cartbutton">Cart</button>
                            </NavLink>
                            </td>
                          
                            <td style={{color:"red",cursor:"pointer"}}><FaTrash onClick={() => deleteUser(i._id, i.fname)} /></td>
                        </tr>
                    )
                })}
            </table> 
            <button className="logout_btn" onClick={logout}>LogOut</button>
            <ToastContainer />
        </div>
    );
}