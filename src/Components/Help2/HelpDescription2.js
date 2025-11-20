import React, { useEffect, useState } from 'react'
import "./HelpDescription2.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { IoIosInformationCircle } from 'react-icons/io';
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const HelpDescription2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [helpPopup, setHelpPopup] = useState(true);
  const [data, setData] = useState([]);
  const [subtitile, setSub] = useState("")
  const handleclicko = () => {
    setHelpPopup(true);
  }
  const handlePopup = () => {
    setHelpPopup(false);
  }
  const showMobnav = () => {
    setShowSidebar(prev => !prev);

  };
  const [helpTitle, setTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tracsdev.apttechsol.com/api/helpsection-description/${id}`)
        setData(response.data?.title_info.description);
        setTitle(response.data?.title_info.seo_title);
        setSub(response.data?.title_info.helpsection.title)

      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [id]);

  const adjustInternalHtml = (html) => {
    const container = document.createElement("div");
    container.innerHTML = html;
    return container.innerHTML;
  }
  const handleNavigate = () => {
    navigate(-1)
  }
  return (
    <div>
      <Header />
      <Navbar />
   <div className='helpdep'>
      <div className='helpcurb1'><p style={{ color: "#007bff !important" }} className='ppffg'></p><p className='helppe'><Link to='/help2' style={{ textDecoration: "none", color: "inherit" }}>App Help</Link></p><p>{" >"}</p><p onClick={handleNavigate}>{subtitile}</p><p>{" >"}</p><p style={{ marginLeft: '10px' }}>{helpTitle}</p></div>

        <div className='holderHelp2' >
          <div className="wdwokm" dangerouslySetInnerHTML={{ __html: adjustInternalHtml(data) }} ></div>
        </div>
   </div>
        <Footer />
      
      </div>
    
  )
}

export default HelpDescription2
