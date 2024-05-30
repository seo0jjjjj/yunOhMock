import React, { useState } from 'react';
import './AsyncButton.css';

const AsyncButton = ({ children, styleObj, className, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    setIsLoading(true);
    if(!onClick) {
      // If onClick is not provided, wait 1s
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      return;
    }
    await onClick(e);
    setIsLoading(false);
  };

  return (
    <button
      className={`async-button ${isLoading ? 'loading' : ''} ${className}`}
      style={styleObj}
      onClick={handleClick}
    >
      {isLoading ? <div className="loader"></div> : children}
    </button>
  );
};

export default AsyncButton;