import React from 'react';

const Profile = ({ userName, onLogout }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-7F7F7F">Welcome, {userName}</span>
      <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">Logout</button>
    </div>
  );
};

export default Profile;
