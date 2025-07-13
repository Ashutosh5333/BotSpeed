import React, { useState, useEffect } from 'react';

// Main App component
const AntSwitchcase = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);


  const AntSwitch = ({ checked, onChange }) => (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only" // Visually hide the checkbox but keep it accessible
          checked={checked}
          onChange={onChange}
        />
        {/* Track - now green when checked */}
        <div
          className={`block w-10 h-6 rounded-full transition-colors duration-300 ease-in-out
                      ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
        ></div> {/* Changed to bg-green-500 */}
        {/* Thumb */}
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out
                      ${checked ? 'transform translate-x-4' : ''}`}
        ></div>
      </div>
    </label>
  );

  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked);
  };

  return (
      <>
         <AntSwitch checked={isSwitchOn} onChange={handleSwitchChange} />
      </>
  )
        
};

export default AntSwitchcase;
