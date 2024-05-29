import { useNavigate } from "react-router-dom";
import AsyncButton from "../components/asyncButton/AsyncButton";
import InputField from "../components/inputField/InputField";
import "../style/login.css";

function Login() {

  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    console.log(process.env.REACT_APP_GOOGLE_AUTH_URL);
    window.open(process.env.REACT_APP_GOOGLE_AUTH_URL);    
  }



  return (<>
  <div className="login-form-container">
    <div className="login-form">
    <h1>로그인</h1>
    <InputField label="아이디" type="text" id="username" name="username" />
    <InputField label="비밀번호" type="password" id="password" name="password" />
    <AsyncButton>
      <span style={{fontWeight: "600"}}>
        로그인
      </span>
    </AsyncButton>
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