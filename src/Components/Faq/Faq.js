import React, { useEffect, useState } from 'react'
import './Faq.css';
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';

import Footer from '../Footer/Footer';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMinus, FaPlus } from 'react-icons/fa';
const Faq = () => {
  const[data,setData]=useState([]);
const [showDetails,setDetails]=useState(null);
const detailsHandle=(id)=>{
  setDetails(previd => previd === id ? null : id)
}
const adjustInternalHtml=(html)=>{
  const container=document.createElement("div");
  container.innerHTML=html;
  return container.innerHTML;
}
useEffect(()=>{
  const fetchData=async()=>{

  
  try{
    const response=await axios.get("https://tracsdev.apttechsol.com/api/Faqsindex");
    setData(response.data.faqs);
console.log("faqs :"+response.data?.faqs[1])
  }catch(err){
    console.log(err)
  }}
fetchData();},[]);

  return (
  <div className="homeHolder">
      <Header />
      <Navbar />
      <div className="ph1">
          <div className="p1h1">
            <h1 style={{fontSize:'35px'}}>Frequently Asked Questions</h1>
          </div>
        </div>    
        <div className='faqContainer'>
          {
            data.map((faq,index)=>(
              <div>
              <div key={faq.id} className='faqHolder' onClick={()=>detailsHandle(faq.id)}><div><strong style={{fontWeight:"600"}}>{faq.name}</strong></div><div>{ showDetails===faq.id ? <FaMinus />:<FaPlus />}</div></div>
             <div> {showDetails===faq.id && <div className='faqDes'><p> <div dangerouslySetInnerHTML={{__html: adjustInternalHtml(faq.description)}}></div></p></div>}</div></div>
            ))
          }
            </div> 
      <Footer />
    </div>
  );
};

export default Faq
