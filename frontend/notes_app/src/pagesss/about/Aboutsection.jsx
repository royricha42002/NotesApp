// AboutSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Add Link import
import aboutImage from './img2.png'; // Ensure this path is correct

const AboutSection = () => {
  return (
    <section id="about-section" className="bg-[#7F7F7F] py-16"> {/* Add id attribute */}
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <img src={aboutImage} alt="About" className="w-3/4 md:w-auto mx-auto" />
        </div>
        <div className="md:w-1/2 md:pl-8 text-center md:text-right">
          <h2 className="text-3xl font-semibold text-[#f1b1ab]">About NotesWorld</h2>
          <p className="mt-4 text-lg text-[#f1b1ab]">
            NotesWorld is a platform dedicated to helping you keep your notes organized and easily accessible. Whether you're a student, professional, or just someone who likes to stay organized, NotesWorld has the tools you need to manage your notes efficiently.
          </p>
          {/* Link to another section */}
          <div className="border-b border-gray-300 pb-2">
            <Link to="/start-noting" className="text-gray-800 hover:text-gray-900 font-semibold">Start Noting</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
