import React from 'react'
import "./ForgotPassword.css"
import Header from '../Heaader/Header'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div>
        <div className='resetPassword'>
           
           <div className='resetPassHolder'>
            <div className='resetPassHolderHeading'><h1>Reset password</h1></div>
            <div className='resetContainer'>
          <div className='resetInputHolder'>
            <div><MdEmail size={24}/></div>
            <div style={{width:"100%"}}> <input type="text"/></div>
            </div> 
            <br/>
            <button>Send Email</button>
           <Link to="/tracsSignIn"><p>Back to Login page</p></Link> 
            </div>
            </div> 
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ForgotPassword

