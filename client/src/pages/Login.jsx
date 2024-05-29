import { useNavigate } from "react-router-dom";
import AsyncButton from "../components/asyncButton/AsyncButton";
import InputField from "../components/inputField/InputField";
import "../style/login.css";
import { useEffect, useRef, useState } from "react";

function Login() {

  const navigate = useNavigate();
  const inputRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const handleGoogleAuth = () => {
    console.log(process.env.REACT_APP_GOOGLE_AUTH_URL);
    window.open(process.env.REACT_APP_GOOGLE_AUTH_URL);
  }


  useEffect(() => {
    console.log("useEffect called from Login")
  }, [])

  return (<>
    <div className="login-form-container">
      <div className="login-form">
        <h1>로그인</h1>
        <form>
          <InputField label="아이디" type="text" id="username" state={[username, setUsername]} autoFocus={true} />
          <InputField label="비밀번호" type="password" id="password" state={[password, setPassword]} />
        </form>
        <AsyncButton styleObj={{ width: "400px", height: "40px" }}>
          <span style={{ fontWeight: "600" }}>
            로그인
          </span>
        </AsyncButton>
        <span className="error-span">아이디 또는 비밀번호가 일치하지 않습니다.</span>
      </div>

      <button className="google-auth" onClick={handleGoogleAuth}>
        <img
          className="google-logo"
          src="https://img.icons8.com/color/48/000000/google-logo.png"
          alt="google-logo"
        />
        구글로 로그인하기
      </button>
    </div>
  </>);
}

export default Login;