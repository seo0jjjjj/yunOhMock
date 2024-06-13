import React, { useState, ReactNode } from 'react';
import './AsyncButton.css';
import { AsyncButtonProps } from '../../types';




const AsyncButton: React.FC<AsyncButtonProps> = ({ children, styleObj = {}, className = '', onClick } : AsyncButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick: (e: React.MouseEvent) => Promise<void> = async (e) => {
      setIsLoading(true);
   
    if (!onClick) {
      // If onClick is not provided, wait 1s
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });
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