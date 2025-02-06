// components/OptionEffect.js
"use client"; // Mark this component as a Client Component

import { useState, useEffect } from 'react';

const OptionEffect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Reset to center after 30 seconds
  useEffect(() => {
    if (selectedOption) {
      const timeout = setTimeout(() => {
        setSelectedOption(null);
      }, 30000); // 30 seconds

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [selectedOption]);

  return (
    <div className="container">
      <div className={`options ${selectedOption ? 'moveLeft' : ''}`}>
        <div
          className="option"
          onClick={() => handleOptionClick('Option 1')}
        >
          Option 1
        </div>
        <div
          className="option"
          onClick={() => handleOptionClick('Option 2')}
        >
          Option 2
        </div>
        <div
          className="option"
          onClick={() => handleOptionClick('Option 3')}
        >
          Option 3
        </div>
      </div>
      <div className={`content ${selectedOption ? 'show' : ''}`}>
        {selectedOption && (
          <>
            <h2>{selectedOption} Content</h2>
            <p>This is the content for {selectedOption}.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OptionEffect;