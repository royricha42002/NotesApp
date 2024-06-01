import React from 'react';
import welcomeImage from './img1.png'; // Ensure this path is correct

const WelcomeSection = () => {
  return (
    <section className="relative bg-[#FFFFF0] pb-48"> {/* Increase padding at the bottom */}
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-3xl font-semibold text-center md:text-left text-gray-800">Welcome to NotesWorld!</h2>
          <p className="mt-4 text-lg text-center md:text-left text-gray-600">
            Your go-to platform for organizing and managing your notes efficiently.
          </p>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <img src={welcomeImage} alt="Welcome" className="w-full md:w-auto" />
        </div>
      </div>
      {/* Curvy ending */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 z-0 w-full"> {/* Adjust viewBox */}
        <path fill="#7F7F7F" fillOpacity="1" d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,138.7C672,139,768,149,864,138.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </section>
  );
};

export default WelcomeSection;
