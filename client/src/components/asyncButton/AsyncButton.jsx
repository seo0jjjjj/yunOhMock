import React, { useState } from 'react';
import './AsyncButton.css';

const AsyncButton = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
   <button 
    className={`async-button ${isLoading ? 'loading' : ''}`} 
    onClick={handleClick}
    >
    {isLoading ? <div className="loader"></div> : children}
  </button>
  );
};

export default AsyncButton;