// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pagesss/navbar/Navbar';
//import Home from './pagesss/home/Home';
import Signup from './pagesss/signup/Signup';
import Login from './pagesss/login/Login';
import WelcomeSection from './pagesss/welcome/Welcomesection';
import AboutSection from './pagesss/about/Aboutsection';
import StartTakingNotesSection from './pagesss/start/Start';
import Dashboard from './pagesss/dashboard/Dashboard';

const user = {
  name: "John Doe"
};

const AppRoutes = () => (
  <Router>
    <Navbar user={user} />
    <Routes>
      <Route path="/" element={
        <div>
          <WelcomeSection />
          <AboutSection id="about-section" />
          <StartTakingNotesSection id="start-noting-section" />
        </div>
      } />
      <Route path="/dashboard/:userId" element={<Dashboard user={user} />} />
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
