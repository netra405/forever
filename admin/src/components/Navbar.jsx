import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(''); // clear token state → triggers App re-render
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between bg-white shadow-md">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="Logo" />
      {token && (
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 cursor-pointer rounded-full text-xs sm:text-sm hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
