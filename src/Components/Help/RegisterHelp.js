import React, { useEffect, useState } from 'react'
import Header from '../Heaader/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import'./RegisterHelp.css'

const RegisterHelp = () => {
      const {id}=useParams();
  const [data,setData]=useState([]);
  {/* https://tracsdev.apttechsol.com/api/helpsection-description/8?acc   */}

  const[helpTitle,setTitle]=useState("");
   useEffect(()=>{
    const fetchData=async()=>{
      try{
const response=await axios.get(`https://tracsdev.apttechsol.com/api/helpsection-description/${id}`)
setData(response.data?.title_info.description);
setTitle(response.data?.title_info.seo_title)

      }catch(err){
        console.log(err)
      }
    }
  fetchData();},[id]);

  const adjustInternalHtml=(html)=>{
    const container=document.createElement("div");
    container.innerHTML=html;
    return container.innerHTML;
  }
  return (
    <div>
      <Header />
      <Navbar />
        <div className='helpcurb1'><p style={{ color: "#007bff !important" }} className='ppffg'></p><p className='helppe'><Link to='/help'style={{ textDecoration: "none", color: "inherit" }}>Help</Link></p><p>{" >"}</p><p style={{ marginLeft: '10px' }}>{helpTitle}</p></div>
      <div className='helpContainer2'>
                        

        <div></div>
       <div dangerouslySetInnerHTML={{__html:adjustInternalHtml(data)}} className='makeIntroHelp2'></div>
        
      </div>
      <Footer />
    </div>
  )
}

export default RegisterHelp
