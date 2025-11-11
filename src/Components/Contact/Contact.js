import React from 'react'
import './Contact1.css'

import { MdEmail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";


import { FaPhoneAlt } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import Header from '../Heaader/Header';
import Navbar from '..//Navbar/Navbar';
import Footer from '../Footer/Footer';
 const Contact = () => {
  return (
    <div>
     <Header/>
     <Navbar/>
      <div className='ph1'><div className='p1h1'><h1 style={{fontSize:'35px'}}> CONTACT</h1></div></div>
    <div className='contatContainer'>
<div className='ch'>
  <h1>Contact Here</h1>
  
  <div className='ch1'>
    <input type='text' placeholder='Name'/>
    <input type='text'  placeholder='Email'/>
  </div>
  <div className='ch2'>
  <input type='text' placeholder='Phone'/>
  <input type='text'  placeholder='Subject'/>
  </div>
  <div className='ch3'>
    <textarea placeholder='Message'/>
  </div>
  <div className='ch4'>
    <button>SEND MESSAGE<div><IoArrowForward size={20} /></div> </ button>
  </div>
</div>
<div className='ci'>
  <h1>Contact Information</h1>
  <div className='ci1'>
    <div className='ci2'>
      <div className='ci21' style={{marginTop:'23px',marginRight:"15px",marginLeft:"10px"}}><FaPhoneAlt size={25} color='orange'/></div>
      <div className='ci22' ><h2>Phone</h2>
      <h2>513.371.5299</h2></div>
    </div>
    <div className='ci4'>
      <div className='ci41' style={{marginTop:'23px',marginRight:"15px",marginLeft:"10px"}}><MdEmail size={25}  color='orange'/></div>
      <div className='ci42'><h2>Email</h2>
      <h2>support@tracs.app</h2></div>
    </div>
    <div className='ci3'>
      <div className='ci31' style={{marginTop:'23px',marginRight:"15px",marginLeft:"10px"}}><FaLocationPin size={25}  color='orange'/></div>
      <div className='ci32'><h2>Address</h2>
      <h2>4031 Colonel Glenn Hwy Suite 416, Dayton, OH 45431</h2></div>
    </div>
    <div className='ci4'></div>
  </div>
</div>
    </div>
  <Footer/>
    </div>
  )
}
export default Contact;