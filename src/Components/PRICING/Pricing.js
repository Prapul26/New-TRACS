import React, { useState } from "react";
import "./Pricing.css";

import Navbar from "..//Navbar/Navbar";
import Footer from "../Footer/Footer";
import { RxCross2 } from "react-icons/rx";
import { Free, Standard, Basic } from "../Data/PricingData";
import { Link } from "react-router-dom";
import Header from "../Heaader/Header";
const Pricing = () => {
  const [popup, setPopup] = useState(false);

  const popUp = () => {
    setPopup(!popup);
    console.log("Popup state:", popup);
  };


  return (
    <div>
      {popup && (
        <div className="popup">
          <div className="popmsg">
            <h2>Are you sure want to start with this package ?</h2>
            <RxCross2 onClick={popUp} />
          </div>
          <div className="paybutton">
            <button onClick={popUp}>Close</button>
            <Link to="/payment">
              <button>Yes</button>
            </Link>
          </div>
        </div>
      )}
      <div className="pricing-container">
        <Header />
        <Navbar />
        <div className="ph1">
          <div className="p1h1">
            <h1 style={{ fontSize: '35px' }}>Pricing</h1>
          </div>
        </div>
        <div className="pricing-holder">
          <div className="cal">
            <h1>Choose your Package</h1>
            <div className="pridiv"></div>
            <p>
              Discover the perfect plan for your needs with our flexible and
              affordable pricing packages. Whether you're an individual
              professional, a small business, or a growing enterprise, we have
              options tailored to suit you.
            </p>
          </div>
          <div className="pricing-details2">
           {/*{Free.map((item, index) => (
              <div key={index} className="pd2">
                <div className="pd2-button">   <button>Free</button></div>
                <h2 style={{ color: "#163b6d" }}>${item.price}
                </h2>
                <p style={{ fontWeight: "400" }}> 1 Year Trial</p>
                <ul>
                  {item.details.map((detail, i) => (
                    <li key={i}>
                      <p style={{ fontWeight: detail.includes("Additional Charges for Integration") ? "500" : "300" }}>{detail}</p>
                    </li>
                  ))}
                </ul>
                <div className="getb">
                  <Link to='/payment'><button>GetStarted</button></Link>
                </div>
              </div>  ))}*/} 
              {Standard.map((item, index) => (
              <div key={index} className="pd3">
                <div className="pd2-button">  <button>Standard</button></div>
                <h2 style={{ color: "#163b6d" }}>${item.price}</h2>
                <p style={{ fontWeight: "400" }}>{item.days} Days Trial</p>
                <ul>
                  {item.details.map((detail, i) => (
                    <li key={i}>
                      <p style={{ fontWeight: detail.includes("Additional Charges for Integration") ? "500" : "300" }}>{detail}</p>
                    </li>
                  ))}
                </ul>
                <div className="getb">
                  <Link to='/payment'><button >GetStarted</button></Link>
                </div>
              </div>
            ))}
            {Basic.map((item, index) => (
              <div key={index} className="pd2">
                <div className="pd2-button">   <button>Basic</button></div>
                <h2 style={{ color: "#163b6d" }}>${item.price}
                </h2>
                <p style={{ fontWeight: "400" }}>{item.days} Days Trial</p>
                <ul>
                  {item.details.map((detail, i) => (
                    <li key={i}>
                      <p style={{ fontWeight: detail.includes("Additional Charges for Integration") ? "500" : "300" }}>{detail}</p>
                    </li>
                  ))}
                </ul>
                <div className="getb">
                  <Link to='/payment'><button>GetStarted</button></Link>
                </div>
              </div>
            ))}
          
          </div>

        </div>{" "}
        <div className="pricingSearch">
          <div className="priceData">
            <h1>Subscribe to Newsletter</h1>
            <p>
              Subscribe to get update and information. Don't worry, we won't
              send spam!
            </p>
          </div>
          <div className="priceSearch">
            <div className="searchdiv">
              <input type="text" placeholder="Email" />
            </div>
            <div className="ppbutton">
              <button >Subscribe Here</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    </div>
  );
};
export default Pricing;
