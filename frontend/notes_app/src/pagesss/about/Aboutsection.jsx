// AboutSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Add Link import
import aboutImage from './img2.png'; // Ensure this path is correct

const AboutSection = () => {
  return (
    <section id="about-section" className="bg-[#a38a8b] py-16"> {/* Add id attribute */}
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <img src={aboutImage} alt="About" className="w-3/4 md:w-auto mx-auto" />
        </div>
        <div className="md:w-1/2 mx-24 md:pl-8 text-center md:text-right">
          <h2 className="text-5xl font-semibold  text-gray-800">About NotesWorld</h2>
          <p className="mt-4 text-xl text-[#fff3ee]">
            NotesWorld is a platform dedicated to helping you keep your notes organized and easily accessible. Whether you're a student, professional, or just someone who likes to stay organized, NotesWorld has the tools you need to manage your notes efficiently.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
