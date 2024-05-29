import React, { useState } from 'react';
import './AsyncButton.css';

const AsyncButton = ({ children, styleObj, className }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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