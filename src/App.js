import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReplyMessage from './Components/ReplyMessage/ReplyMessage'
import MakeIntroduction from './Components/MakeIntroduction/MakeIntroduction';
import NewMessage from './Components/NewMessage/NewMessage';

const App = () => {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/replyMessage" element={<ReplyMessage />} />
        <Route path='/makeIntroduction' element={<MakeIntroduction />}/>
        <Route path='/' element={<NewMessage />}/>
      </Routes>
     </Router>
    </div>
  )
}

export default App
