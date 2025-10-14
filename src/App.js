import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReplyMessage from './Components/ReplyMessage/ReplyMessage'
import MakeIntroduction from './Components/MakeIntroduction/MakeIntroduction';

const App = () => {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/replyMessage" element={<ReplyMessage />} />
        <Route path='/makeIntroduction' element={<MakeIntroduction />}/>
      </Routes>
     </Router>
    </div>
  )
}

export default App
