import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="h-full flex justify-between items-center p-4 bg-white shadow-md ">
      <div className="relative ">
        <input
          type="text"
          className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
          placeholder="Search..."
        />
        {/* <img className="w-16 h-16 rounded-full mx-auto" src="" alt="Logo" /> */}
        {/* <FaSearch className="absolute top-3 left-3 text-gray-400" /> */}
      </div>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-500 text-lg cursor-pointer" />
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-gray-500 text-2xl" />
          <div>
            <p className="text-sm font-semibold">Afraz Ali</p>
            <p className="text-xs text-gray-400">afraz.ali@skysolutions.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
