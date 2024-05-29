import React, { useEffect, useRef, useState } from 'react';
import './inputField.css';

function InputField({label, type, id, name, ref}) {
  const [showPassword, setShowPassword] = useState(null);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if(type === 'password') {
      setShowPassword(false);
    }
  },[]);

  return (
    <div className='input-field'>
      <label 
      for={id}>{label}</label>
      <div className='input-box'>
      <input
        // 타입이 존재하지 않을 경우, 
        type={type === 'password' && showPassword ? 'text' : type}
        id={id}
        name={name}
        placeholder={`${label}를 입력해주세요`}
      />{ showPassword !== null 
      && <box-icon
          style={{opacity: showPassword ? 0.5 : 1}}
          class="eyecon"
          name='show-alt'
          onClick={togglePasswordVisibility}
       />}
    </div>
    </div>
  );
}

export default InputField;

