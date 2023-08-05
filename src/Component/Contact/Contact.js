import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';
import "./Contact.css";
import Footer from '../Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
const [name,setname]=useState("");
const [email,setemail]=useState("");
  const notify = () => {
    if(email===""||name==="")
    toast.warn("Please Fill all Details!");
    else
    toast.success("Message Sent Successfully!");
    }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ei4ae0p', 'template_2bxt63i', form.current, 'sqRPyLodGgrxSMZxA')
      .then((result) => {
          console.log(result.text);
          console.log("message sent");
      }, (error) => {
          console.log(error.text);
      });
    };

    

  return (
    <>
    <div className="form" >
      
      <h1>CONTACT US</h1>
  
      <form ref={form} onSubmit={sendEmail}>
    
        <label>Name:<input name="user_name"  onChange={(e) => setname(e.target.value)} required/></label>
        <label>Email:<input name="user_email"  onChange={(e) => setemail(e.target.value)} required/></label>
        <label>Message:</label>
        <textarea name="message" rows="6" placeholder="Type your message here" required/>
        <button className="btn" onClick={notify}>Submit</button>
        <ToastContainer />
      </form>
    </div>
   
    </>
  );
};

export default Contact;
