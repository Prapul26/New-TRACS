import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Header from '../Heaader/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { IoLockClosed, IoPerson } from 'react-icons/io5';
import { IoIosInformationCircle, IoMdMail } from 'react-icons/io';
import { AiTwotoneQuestionCircle } from 'react-icons/ai';
import axios from 'axios';
import { FaCircleQuestion } from 'react-icons/fa6';
import { CiLock } from 'react-icons/ci';

const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(""); // "success" | "error"

  const [popUp, setPopUp] = useState(false);
  const [popupMessage, setPopupMessage] = useState([])
  const showPopUp = () => {
    setPopUp(true);
  }
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("https://tracsdev.apttechsol.com/api/storeLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(". . . Login successful! . . .");
        sessionStorage.setItem("authToken", data.token);
        setMessageType("success");
        setTimeout(() => {
          navigate("/dashboard"); // change "/email" to your actual email page route
        }, 2000);

      } else {
        setMessageType("error");
        setTimeout(() => {
          setMessage()
        }, 2000);
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setMessageType("error");
      setTimeout(() => {
        setMessage()
      }, 2000);
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchKeyfield = async () => {
      try {
        // 👇 Replace this with the correct endpoint for keyfields
        const response = await axios.get(
          "https://tracsdev.apttechsol.com/api/helpsection-descriptionnew/10"
        );

        console.log("Keyfield API response:", response.data);

        // If API returns an object with "description"
        if (response.data.description) {
          setPopupMessage(response.data.description);
        }

        // If API returns an array of keyfields instead
        if (response.data.keyfields) {
          const field = response.data.keyfields.find((item) => item.id === 10);
          setPopupMessage(field?.description || "");
        }
      } catch (err) {
        console.error("Error fetching keyfield:", err);
      }
    };

    fetchKeyfield();
  }, []);


  const adjustInternalHtml = (html) => {
    const container = document.createElement("div");
    container.innerHTML = html;
    return container.innerHTML;
  }
  const EmailIcon = () => (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.161V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div>   {<div className="errmsg" style={{ backgroundColor: messageType === "success" ? "green" : "red" }}><p>{message}</p></div>}
      <Header />
      <Navbar />
      <div className='LoginPage'>


        <div className='abd'>
          <h1>Sign up or log in to your account</h1>

          <div className='no1'>
            <div className='oneb'><h1>1</h1></div>
            <div className='oneContent'>
              <h4>Current H7 Members do not need to Sign Up. They only need to Sign In.</h4>
              <p>If you are logging in first time, click on Forgot Password link to create a password. It will send you an email to your registered email. Please also check your SPAM email folder.</p>
            </div>
          </div>

          <div className='no2'>
            <div className='twob'><h1>2</h1></div>
            <div className='twoContent'>
              <h4>NEW TRACS Users need to Sign Up first unless they are a current H7 Member. H7 Members need to follow up Step 1.</h4>
            </div>
          </div>
        </div>

        <form className='LoginContainer' onSubmit={handleLogin}>
          <h1 style={{fontSize:"28px"}}>Sign In</h1>
          <div className='loginInputsDiv'>
            <div style={{ marginTop: "5px" }}><IoMdMail /></div>
            <div style={{ width: "90%" }}><input
              type='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /></div>
          </div>

          <br />
          <div className='loginInputsDiv'>
            <div style={{ marginTop: "5px" }}><CiLock /></div>
            <div style={{ width: "90%" }}>  <input
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /></div>
          </div>

          <br />
          <div style={{ display: "flex", justifyContent: "space-between" ,marginTop:"20px"}}>
            <div style={{ display: "flex" }}><div style={{marginTop:"-12px",marginBottom:"1px"}}><input type='checkbox' /></div><div className='forpassd'><p>Keep me Log In</p></div></div>
            <Link to='/forgotPassword' style={{ textDecoration: "none" }}> <div className='forpass'><p>Forgot Password ?</p></div></Link>
          </div>
          <button type='submit' style={{color:"black"}}>Login</button>
          {popUp && popupMessage && (
            <div
              className="popShow" style={{ color: 'white' }}
              dangerouslySetInnerHTML={{ __html: adjustInternalHtml(popupMessage) }}
              onMouseLeave={() => setPopUp(false)}
            />
          )}

          <div className='registerKey'>  <div className='regP'><Link to="/register" style={{ textDecoration: "none" }}><p >Register</p></Link></div>
            <div style={{ marginTop: "3px", marginLeft: "4px" }} onMouseEnter={() => setPopUp(true)}><FaCircleQuestion color='black' /></div></div>
          
        </form>
      </div>
      <Footer />
     
    </div>
  );
};

export default Login;
