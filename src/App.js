import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReplyMessage from './Components/ReplyMessage/ReplyMessage'
import MakeIntroduction from './Components/MakeIntroduction/MakeIntroduction';
import NewMessage from './Components/NewMessage/NewMessage';
import MyMembership from './Components/MyMembership/MyMembership';
import MyContacts from './Components/MyContacts/MyContacts';
import MyProfile from './Components/MyProfile/MyProfile';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import EmailSignature from './Components/EmailSignature/EmailSignaature';
import EmailTemplate from './Components/EmailTemplate/EmailTemplate';
import NewContacts from './Components/NewContacts/NewContacts';
import Test from './Components/Test';
import Test2 from './Components/Test2';
import ViewMessage from './Components/ViewMessage/ViewMessage';
import AppHelp from './Components/AppHelp/AppHelp';
import Invoice from './Components/Invoice/Invoice';
import Home from './Components/Home/Home';
import Pricing from './Components/PRICING/Pricing';
import Partner from './Components/Partner/Partner';
import About_us from './Components/ABOUT_US/About_us';
import Contact from './Components/Contact/Contact';
import Faq from './Components/Faq/Faq';
import  Network  from './Components/Network/Network';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register'
import TracsReply from './Components/TracsReply';
import TracsSignIn from './Components/TracsSignIn';
import FaqIem from './Components/FaqItem';


const App = () => {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/replyMessage/:subject/:user_id/:replies_code" element={<ReplyMessage />} />
        <Route path='/makeIntroduction' element={<MakeIntroduction />}/>
        <Route path='/dashboard' element={<NewMessage />}/>
        <Route path='/myMembership' element={<MyMembership />} />
        <Route path='/myContacts' element={<MyContacts />} />
        <Route path='/myProfile' element={<MyProfile />}/>
        <Route path='/changePassword' element={<ChangePassword />}/>
        <Route path='/emailSignature' element={<EmailSignature/>}/>
        <Route path='/emailTemplate' element={<EmailTemplate />}/>
        <Route path='/newContacts' element={<NewContacts/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/viewMessage/:subject/:user_id/:replies_code' element={<ViewMessage/>} />
          <Route path='/test2' element={<Test2/>}/>
          <Route path='/appHelp' element={<AppHelp />}/>
          <Route path='/invoice/:id' element={<Invoice />}/>
            <Route path='/' element={<Home />}/>
            <Route path='/pricing' element={<Pricing />}/>
            <Route path='/partner' element={<Partner />}/>
            <Route path='/about_us' element={<About_us />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='/faq' element={<Faq />}/>
            <Route path='/network' element={<Network />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/tracsReply' element={<TracsReply />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/tracsSignIn' element={<TracsSignIn />}/>
            <Route path='/faqIem' element={<FaqIem />}/>
      </Routes>
     </Router>
    </div>
  )
}

export default App
