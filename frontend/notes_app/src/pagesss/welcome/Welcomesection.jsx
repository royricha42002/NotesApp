import React from 'react';
import welcomeImage from './img1.png'; // Ensure this path is correct

const WelcomeSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#a38a8b] flex justify-center items-center h-screen">
      <div className="container mx-24  flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        <div className="md:w-1/2 space-y-8 md:pr-8">
          <h2 className="text-6xl font-semibold text-gray-800">Welcome to NotesWorld!</h2>
          <p className="mt-4 text-2xl text-gray-600">
            Your go-to platform for organizing and managing your notes efficiently.
          </p>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center">
          <img src={welcomeImage} alt="Welcome" className="w-full md:w-auto max-w-xs md:max-w-md" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
