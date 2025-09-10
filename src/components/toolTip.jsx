// src/components/Tooltip.js
import React from 'react';

const Tooltip = ({ children, content }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute z-10 hidden group-hover:block bg-gray-800 text-white body-xs  rounded py-1 px-2 whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;