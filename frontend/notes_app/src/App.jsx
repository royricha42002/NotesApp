import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pagesss/navbar/Navbar';
import Home from './pagesss/home/Home';
import Signup from './pagesss/signup/Signup';
import Login from './pagesss/login/Login';
import WelcomeSection from './pagesss/welcome/Welcomesection';
import AboutSection from './pagesss/about/Aboutsection';
import StartTakingNotesSection from './pagesss/start/Start';
import Axios from "axios";

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={
        <div>
          <WelcomeSection />
          <AboutSection id="about-section" />
          <StartTakingNotesSection/>
          {/* Other sections */}
        </div>
      } />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
);

const App = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;