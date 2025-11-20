import React, { useEffect, useState } from 'react'
import './LoginHelp.css'
import Header from '../Heaader/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
const LoginHelp = () => {
  const {id}=useParams();
  const [data,setData]=useState([]);
  const[helpTitle,setTitle]=useState("");
  useEffect(()=>{
    const fetchData=async()=>{
      try{
const response=await axios.get(`https://tracsdev.apttechsol.com/api/helpsection/${id}`)
setData(response.data.subtitles)
setTitle(response.data.title_info?.helpsection)
      }catch(err){
        console.log(err)
      }
    }
  fetchData();},[id])
  return (
    <div>
      <Header/>
      <Navbar />
                  <div className='helpcurb1'><p style={{ color: "#007bff !important" }} className='ppffg'></p><p className='helppe'><Link to='/help'style={{ textDecoration: "none", color: "inherit" }}>Help</Link></p><p>{" >"}</p><p style={{ marginLeft: '10px' }}>{helpTitle.title}</p></div>
                   <div className='makeIntroHelp'>
                <h2>{helpTitle.title}</h2>
             {data.map((help,index)=>( <Link to={`/helpDescription/${help.id}`} style={{textDecoration:"none",color:"inherit"}}><div style={{marginBottom:"30px"}} className='selectM' key={help.id}>
                    <div>
                     <h5>{help.title}</h5></div>
                    <div>
                      <h5 style={{ fontWeight: '800', color: "#007bff" }}>{">"}</h5></div>
                </div></Link> ))}
               
            </div>

      <div>

      </div>
      <Footer />
    </div>
  )
}

export default LoginHelp
