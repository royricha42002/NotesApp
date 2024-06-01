import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(location.pathname === '/login' || location.pathname === '/signup');
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStartNoting = () => {
    const startNotingSection = document.getElementById('start-noting-section');
    if (startNotingSection) {
      startNotingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-[#FADBD8] p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-7F7F7F text-2xl font-bold">NotesWorld</div>
        <div className="hidden md:flex space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F  hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
            <Link to="#" onClick={scrollToAbout}>About</Link>
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F  hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
            <Link to="#" onClick={scrollToStartNoting}>Start Noting</Link>
          </button>
        </div>
      </div>
      <div className="hidden md:flex space-x-4">
        {isLoggedIn ? (
          <div className="flex justify-center">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F bg-[#FF7F50] hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
              <Link to="/">Dashboard</Link>
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F bg-[#FF7F50] hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
              <Link to="/login">Sign In</Link>
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F bg-[#FF7F50] hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-7F7F7F focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-[#f1b1ab] w-64 py-4 px-6 flex flex-col space-y-2">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F  hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
              <Link to="/about" onClick={scrollAbout}>About</Link>
            </button>
            <div className="border-b border-gray-300 pb-2">
              <Link to="/start-noting" className="text-gray-800 hover:text-gray-900 font-semibold">Start Noting</Link>
            </div>
            {isLoggedIn ? (
              <div className="border-b border-gray-300 pb-2">
                <Link to="/" className="text-gray-800 hover:text-gray-900 font-semibold">Dashboard</Link>
              </div>
            ) : (
              <div className="border-b border-gray-300 pb-2">
                <Link to="/signin" className="text-gray-800 hover:text-gray-900 font-semibold">Login</Link>
              </div>
            )}
            <div>
              {isLoggedIn ? (
                <Link to="/logout" className="text-gray-800 hover:text-gray-900 font-semibold">Logout</Link>
              ) : (
                <Link to="/signup" className="text-gray-800 hover:text-gray-900 font-semibold">Sign Up</Link>
              )}
            </div>
            <button onClick={toggleMenu} className="bg-f1b1ab py-2 px-3 rounded-md text-sm text-gray-900 font-semibold hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Back</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;