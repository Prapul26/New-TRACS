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


const App = () => {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/replyMessage" element={<ReplyMessage />} />
        <Route path='/makeIntroduction' element={<MakeIntroduction />}/>
        <Route path='/' element={<NewMessage />}/>
        <Route path='/myMembership' element={<MyMembership />} />
        <Route path='/myContacts' element={<MyContacts />} />
        <Route path='/myProfile' element={<MyProfile />}/>
        <Route path='/changePassword' element={<ChangePassword />}/>
        <Route path='/emailSignature' element={<EmailSignature/>}/>
        <Route path='/emailTemplate' element={<EmailTemplate />}/>
        <Route path='/newContacts' element={<NewContacts/>}/>
      </Routes>
     </Router>
    </div>
  )
}

export default App
