import React from 'react'

import Footer from '../Footer/Footer';
import "./About_us.css";

import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const About_us = () => {
    const navigate=useNavigate()
    const handelJoin=()=>{
        const token=sessionStorage.getItem("authToken");
        navigate(token?"/myMembership":"/register")
    }
    return (
        <div>
       <Header/>

        <Navbar/>
            <div className='ph1'><div className='p1h1'><h1 style={{fontSize:'35px'}}>About Us</h1></div></div>
            <div className='About_us-container'>

                <div className='a_1'>
                    <ul>WELCOME TO TRACS</ul>
                    <p >At TRACS, we believe in the power of connections. Our platform is designed to be the heartbeat of professional networking, where members come together to forge meaningful relationships, exchange ideas, and unlock new opportunities. Our platform is designed for individuals and businesses seeking meaningful networking experiences.</p>
                </div>
            
                <div className='a_3' >
                    <ul>Who We Are:</ul>
                    <p>We are more than just a networking app; we are a dynamic community of professionals, entrepreneurs, and thought leaders. TRACS is the go-to destination for those who understand the importance of building strong, authentic connections in the business world.</p>
                </div>
                <div className='a_4'>
                    <div className='a_41'><img src="https://tracsdev.apttechsol.com/public/uploads/website-images/Our Mission & Vision.jpg"/></div>
                    <div className='a_42'><ul>Our Mission:</ul>
                        <p>Empowering individuals to grow, succeed, and innovate through the strength of their network. We are on a mission to redefine how professionals connect, communicate, and collaborate in today's fast-paced business landscape.</p>
                        <ul>Our Vision</ul>
                        <p>Our platform aims to be the cornerstone of global networking, empowering individuals and enterprises to expand their reach, exchange knowledge, and forge impactful partnerships.</p></div>
                </div>
               
                <div className='a_7'>
                <ul> Join Us in Building the Future:</ul>
                <p>We invite you to be part of a community that values collaboration, innovation, and the limitless possibilities that arise when great minds come together. Whether you're looking for career opportunities, business partnerships, or simply seeking inspiration, TRACS is the catalyst for your success.</p>
                </div>
                <div><button className='joinnnnn' onClick={handelJoin}>Register</button></div>
            </div>
            <Footer />
        </div>
    )
}
export default About_us;