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
      <Header />
      <Navbar />
      <div className='ph1' style={{ marginTop: "2px" }}><div className='p1h1'><h1 style={{ fontSize: '35px' }}> CONTACT</h1></div></div>
      <div className='contatContainer'>
        
        <div className='ci'>
          <h1 style={{fontSize:"25px",fontWeight:"500"}}>Contact Information</h1>
          <div className='ci1'>
            <div className='ci2' style={{marginTop:"30px"}}>
              <div className='ci21' style={{ marginTop: '23px', marginRight: "15px", marginLeft: "10px" }}><FaPhoneAlt size={25} color='orange' /></div>
              <div className='ci22' ><h1 style={{color:"white",fontSize:"25px"}}>Phone</h1>
                <h2 style={{marginTop:"10px"}}>513.371.5299</h2></div>
            </div>
            <div className='ci4' style={{marginTop:"30px"}}>
              <div className='ci41' style={{ marginTop: '23px', marginRight: "15px", marginLeft: "10px" }}><MdEmail size={25} color='orange' /></div>
              <div className='ci42'><h1 style={{color:"white",fontSize:"25px"}}>Email</h1>
                <h2 style={{marginTop:"10px"}}>support@tracs.app</h2></div>
            </div>
            <div className='ci3'style={{marginTop:"30px",marginBottom:"30px"}}>
              <div className='ci31' style={{ marginTop: '23px', marginRight: "15px", marginLeft: "10px" }}><FaLocationPin size={25} color='orange' /></div>
              <div className='ci32'><h1 style={{color:"white",fontSize:"25px"}}>Address</h1>
                <h2 style={{marginTop:"10px"}}>4031 Colonel Glenn Hwy Suite 416, Dayton, OH 45431</h2></div>
            </div>
            <div className='ci4'></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Contact;