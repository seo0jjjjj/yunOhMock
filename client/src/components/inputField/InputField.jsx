import React, { useEffect, useRef, useState } from "react";

import "./inputField.css";

const InputField = React.memo(
  ({ label, type, id, state, autoFocus, children, rep }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputState, setInputState] = state;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleOnChange = (e) => {
      setInputState(e.target.value);
    };

    return (
      <div className="input-field">
        <label htmlFor={id}>{label}</label>
        <div className="input-box">
          <input
            // 타입이 존재하지 않을 경우,
            ref={rep || null}
            autoFocus={autoFocus}
            type={type === "password" && showPassword ? "text" : type}
            id={id}
            value={inputState}
            onChange={handleOnChange}
            placeholder={`${label}를 입력해주세요`}
            autoComplete={
              id === "password"
                ? "current-password"
                : id === "username"
                  ? "username"
                  : undefined
            }
          />
          {type === "password" && (
            <i
              style={{ opacity: showPassword ? 1 : 0.5 }}
              className="bx bx-show-alt eyecon"
              onClick={togglePasswordVisibility}
            />
          )}
          {children}
        </div>
      </div>
    );
  }
);

export default InputField;
