import React, { useEffect, useState } from 'react'
import "./Help2.css"
import { RxCross2 } from 'react-icons/rx'
import { MdKeyboardArrowRight } from 'react-icons/md'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosInformationCircle } from 'react-icons/io'
import Header from '../Heaader/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
const Help2 = () => {
  const [data, setData] = useState([]);
           useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://tracsdev.apttechsol.com/api/helpsection ");
                setData(response.data.blogs || [])
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    },)
  return (
    <div>
        <Header />
        <Navbar />
        <div className='helpdep'>
               <div className='holderHelp'>
                                            {data.map((help,index)=>(
                                           <Link style={{textDecoration:"none",color:"inherit"}} to={`/helpSection2/${help.id}`}> <div className='help2oo'>
                                                <div><strong>{help.title}</strong></div>
                                                <div><strong><MdKeyboardArrowRight /></strong></div>
                                            </div></Link>))}
                                        </div>
        </div>
    <Footer />
    </div>
  )
}


export default Help2
