import React, { useEffect, useState } from 'react'
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Help.css'
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
const Help = () => {
  const [data, setData] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [id, setId] = useState(null);
  const toggleDropDown = (id) => {
    setActiveId(prevId => prevId === id ? null : id);
    setId(id);
  };

  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {

        const response = await axios.get(`https://tracsdev.apttechsol.com/api/helpsection/${id}`);
        setData2(response.data.subtitles)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData2()
  }, [id])




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
    <div className="homeHolder">
      <Header />
      <Navbar />

      <div className='helpcurb1'><p style={{ color: "#007bff !important" }} className='ppffg'></p><p></p><p style={{ marginLeft: '10px' }}>Help</p></div>
      <div className='helpContainer'>
        {data.map((help, index) => (
          <div>
            <div className='makeIntoButtonContainer' onClick={() => toggleDropDown(help.id)} key={help.id}>
              <div>
                <h5>

                  {help.title}

                </h5>
              </div>
              <div>

                <h5 style={{ fontWeight: '800', color: "#007bff" }}>{activeId === help.id ? <FaChevronUp /> : <FaChevronDown />}</h5>
              </div>

            </div>   {activeId === help.id && (
              <div className='subtitles'>
                {data2.map((help, index) => (<Link to={`/helpDescription/${help.id}`} style={{ textDecoration: "none", color: "inherit" }}><div style={{ marginBottom: "30px" }} className='titles' key={help.id}>
                  <div>
                    <h5>{help.title}</h5></div>
                  <div>
                    <h5 style={{ fontWeight: '800', color: "#007bff" }}>{">"}</h5></div>
                </div></Link>))}
              </div>
            )} </div>
        ))}


        <div></div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
};

export default Help
