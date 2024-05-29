import React, { useEffect, useRef, useState } from 'react';

import './inputField.css';

const InputField = React.memo(({ label, type, id, state, autoFocus }) => {
  const [showPassword, setShowPassword] = useState(null);
  const [inputState, setInputState] = state;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (type === 'password') {
      setShowPassword(false);
    }

  }, []);

  const handleOnChange = (e) => {
    setInputState(e.target.value);
  }

  return (
    <div className='input-field'>
      <label
        htmlFor={id}>{label}</label>
      <div className='input-box'>
        <input

          // 타입이 존재하지 않을 경우, 
          autoFocus={autoFocus}
          type={type === 'password' && showPassword ? 'text' : type}
          id={id}
          value={inputState}
          onChange={handleOnChange}
          placeholder={`${label}를 입력해주세요`}
          autoComplete={id === 'password' ? "current-password" : id === "username" ? "username" : undefined}
        />{showPassword !== null
          && <i
            style={{ opacity: showPassword ? 1 : 0.5 }}
            className="bx bx-show-alt eyecon"
            onClick={togglePasswordVisibility}
          />}
      </div>
    </div>
  );
});

export default InputField;

