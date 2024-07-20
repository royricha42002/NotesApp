import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
    if (userId) {
      fetchUserName(userId);
    }
  }, [location]);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`https://notesapp-3qhd.onrender.com/getUsers/${userId}`);
      const user = response.data;
      setUserName(user ? user.name : 'Unknown User');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-[#f1b1ab] bg-gradient-to-r from-[#f1b1ab] to-[#f19066] p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <div
          className="text-white text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          NotesWorld
        </div>
        {isHomePage && !isLoggedIn && (
          <div className="hidden md:flex space-x-4">
            <button
              className="inline-flex items-center px-4 py-2 border border-[#455A64] font-semibold text-[#455A64] rounded-md hover:bg-[#455A64] hover:border-[#455A64] hover:text-[#f1b1ab] focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => scrollToSection('about-section')}
            >
              About
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-[#455A64] font-semibold text-[#455A64] rounded-md hover:bg-[#455A64] hover:border-[#455A64] hover:text-[#f1b1ab] focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => navigate('/login')}
            >
              Start Noting
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <span className="text-white text-lg font-medium">Hi! {userName}</span>
        )}
        {isHomePage && !isLoggedIn && (
          <>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-[#455A64] font-semibold text-[#455A64] rounded-md hover:bg-[#455A64] hover:border-[#455A64] hover:text-[#f1b1ab] focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-4 py-2 border border-[#455A64] font-semibold text-[#455A64] rounded-md hover:bg-[#455A64] hover:border-[#455A64] hover:text-[#f1b1ab] focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Sign Up
            </Link>
          </>
        )}
        {(isLoginPage || isSignupPage) && (
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-[#455A64] font-semibold text-[#455A64] rounded-md hover:bg-[#455A64] hover:border-[#455A64] hover:text-[#f1b1ab] focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Dashboard
          </button>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-[#455A64] font-semibold text-[#455A64] rounded-md hover:bg-[#455A64] hover:border-[#455A64] hover:text-[#f1b1ab] focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Logout
          </button>
        )}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-64 py-4 px-6 flex flex-col space-y-2">
            {isHomePage && !isLoggedIn && (
              <>
                <button
                  className="inline-flex items-center px-4 py-2 border border-[#1A237E] text-base font-medium text-gray-800 rounded-md hover:bg-gray-200 hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => {
                    scrollToSection('about-section');
                    toggleMenu();
                  }}
                >
                  About
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium text-gray-800 rounded-md hover:bg-gray-200 hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => {
                    navigate('/login');
                    toggleMenu();
                  }}
                >
                  Start Noting
                </button>
              </>
            )}
            <button
              onClick={toggleMenu}
              className="bg-white py-2 px-3 rounded-md text-sm text-gray-900 font-semibold hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
