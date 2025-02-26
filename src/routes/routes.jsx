import React from 'react'
import Login from '../pages/Login'
import ProtectedRoutes from '../routes/ProtectedRoutes'
import Home from '../pages/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Routering = () => {
  return ( 
    <Router>
      <Routes>
        <Route path="*" element={<Login/>} />
        <Route path="/home" element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>
          } 
        />
      </Routes>
    </Router>
   );
}
 
export default Routering;