import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <section id="start-noting-sectionx  " className="bg-gradient-to-b from-[#a38a8b] to-white py-8">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Start Taking Notes</h2>
        <Link to="/login" className="bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4"> Start</Link>
      </div>
    </section>
  );
};

export default Start;