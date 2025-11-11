import React from 'react'
import './Partner.css';


import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Partner = () => {
  return (
    <div>
    <Header/>
    <Navbar/>
    <div className='ph1'><div className='p1h1'><h1>Partners</h1></div></div>

      <div className='partnerContainer'>
        <div className='picOne'>
          <a style={{textDecoration:"none", color:'inherit'}} href='https://www.h7network.com/' target="_blank" rel="noopener noreferrer" > <div className='pc1'>
            <img src="https://tracsdev.apttechsol.com/public/uploads/partners/H7 Network.png"/>
            <p>H7 Network</p>
          </div></a>
         
          <a  style={{textDecoration:"none", color:'inherit'}} href='https://www.evolvewomensnetwork.com/' target="_blank" rel="noopener noreferrer" ><div className='pc2'>
            <img src="https://tracsdev.apttechsol.com/public/uploads/partners/e.png"/>
            <p>EVOLVE WOMEN'S NETWORK</p>
          </div></a> 
        </div>
        <div className='picTwo'>
         <a  style={{textDecoration:"none", color:'inherit'}} href='https://www.evolvewomensnetwork.com/' target="_blank" rel="noopener noreferrer" ><div className='pc3'>
            <img src="https://tracsdev.apttechsol.com/public/uploads/partners/H7.jpeg"/>
            <p>H7 Town Square</p>
          </div></a>  
           <a  style={{textDecoration:"none", color:'inherit'}} href='https://www.thealternativeboard.com/' target="_blank" rel="noopener noreferrer" ><div className='pc4'>
            <img  src="https://tracsdev.apttechsol.com/public/uploads/partners/TAB.png"/>
            <p>TAB</p>
          </div></a>
        </div>

        <a  style={{textDecoration:"none", color:'inherit'}} href='https://www.blackachievers.com/' target="_blank" rel="noopener noreferrer" ><div className='pc5'>
          <img src="https://tracsdev.apttechsol.com/public/uploads/partners/Black Achievers.png"/>
          <p>Black Achievers</p>
        </div></a> 
      </div>
      <Footer/>
    </div>
  )
}
export default Partner;