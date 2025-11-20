import React, { useEffect, useState } from 'react'
import './HelpSection2.css'
import { Link, useParams } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { IoIosInformationCircle } from 'react-icons/io';
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const HelpSection2 = () => {
       const {id}=useParams();
     const [showSidebar, setShowSidebar] = useState(false);
         const [helpPopup, setHelpPopup] = useState(true);
            const [data, setData] = useState([]);
            const[subtitile,setSub]=useState("")
            const handlePopup = () => {
                setHelpPopup(false);
            }
               const handleclicko=()=>{
        setHelpPopup(true);
    }
         const showMobnav = () => {
           setShowSidebar(prev => !prev);
       
         };
         
         
         useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://tracsdev.apttechsol.com/api/helpsection/${id}`);
                setData(response.data.subtitles || []);
                setSub(response.data.title_info.helpsection.title)
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
    <div className='helpSecin'> 
        <div className='holderHelp'>
                                            {data.map((help,index)=>(
                                           <Link style={{textDecoration:"none",color:"inherit"}} to={`/helpDescription2/${help.id}`}> <div className='help2oo'>
                                                <div><strong>{help.title}</strong></div>
                                                <div><strong><MdKeyboardArrowRight /></strong></div>
                                            </div></Link>))}
                                        </div>
    </div>
    <Footer />
    </div>
  )
}

export default HelpSection2
