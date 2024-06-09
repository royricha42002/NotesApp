import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(['/login', '/signup', '/dashboard'].includes(location.pathname));
    if (location.pathname === '/dashboard') {
      fetchUserName();
    }
  }, [location]);

  const fetchUserName = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getUsers','a@gmail.com'); // Adjust this to the correct endpoint if needed
      const user = response.data.find(user => user.email === localStorage.getItem('email'));
      console.log(localStorage.getItem('email'));
      setUserName(user ? user.name : 'Unknown User');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

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

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <nav className="bg-[#FADBD8] p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-7F7F7F text-2xl font-bold">NotesWorld</div>
        {!isLoggedIn && (
          <div className="hidden md:flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
              <Link to="#" onClick={scrollToAbout}>About</Link>
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
              <Link to="#" onClick={scrollToStartNoting}>Start Noting</Link>
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <span className="text-7F7F7F text-lg font-medium">{userName}</span>
        )}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-7F7F7F hover:text-[#FADBD8]">Login</Link>
            <Link to="/signup" className="text-7F7F7F hover:text-[#FADBD8]">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-7F7F7F hover:text-[#FADBD8]">Logout</button>
        )}
        <button onClick={toggleMenu} className="md:hidden text-7F7F7F hover:text-[#FADBD8]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-[#f1b1ab] w-64 py-4 px-6 flex flex-col space-y-2">
            {!isLoggedIn && (
              <>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
                  <Link to="#" onClick={scrollToAbout}>About</Link>
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-7F7F7F hover:bg-[#7F7F7F] hover:text-[#FADBD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-7F7F7F">
                  <Link to="#" onClick={scrollToStartNoting}>Start Noting</Link>
                </button>
              </>
            )}
            <button onClick={toggleMenu} className="bg-f1b1ab py-2 px-3 rounded-md text-sm text-gray-900 font-semibold hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Back</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
