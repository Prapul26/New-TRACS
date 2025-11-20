import React from 'react'
import './MakeHelp.css'
import Header from '../Heaader/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
const MakeHelp = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <div className='helpcurb1'><p style={{ color: "#007bff !important" }} className='ppffg'></p><p className='helppe'><Link to='/help'style={{ textDecoration: "none", color: "inherit" }}>Help</Link></p><p>{" >"}</p><p style={{ marginLeft: '10px' }}>Make Introduction</p></div>

            <div className='makeIntroHelp'>
                <h2>Make Introduction</h2>
                <div className='selectM'>
                    <div><h5>Select Members</h5></div>
                    <div><h5 style={{ fontWeight: '800', color: "#007bff" }}>{">"}</h5></div>
                </div>
                <div className='selectM'>
                    <div><h5>E-Mail Templates</h5></div>
                    <div><h5 style={{ fontWeight: '800', color: "#007bff" }}>{">"}</h5></div>
                </div>
                <div className='selectM'>
                    <div><h5> Token Replace</h5></div>
                    <div><h5 style={{ fontWeight: '800', color: "#007bff" }}>{">"}</h5></div>
                </div>
                <div style={{marginBottom:"30px"}} className='selectM'>
                    <div><h5>Signature</h5></div>
                    <div><h5 style={{ fontWeight: '800', color: "#007bff" }}>{">"}</h5></div>
                </div>
            </div>
            
            <Footer />

        </div>
    )
}

export default MakeHelp
