import { useNavigate } from "react-router-dom";
import AsyncButton from "../components/asyncButton/AsyncButton";
import InputField from "../components/inputField/InputField";
import "../style/login.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../util/axiosService";

function Login() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorSpan, setErrorSpan] = useState("");

  // 로그인 진행
  const handleOnclickLoginBtn = async () => {
    const data = { username, password };

    // 로그인 요청
    login(data, {
      onSuccess: (res) => {
        // 로그인 성공
        dispatch({ type: "LOGIN", payload: res.data });
        console.log(res.data);
        navigate("/");
      },
      onFailure: (err) => {
        // 로그인 실패
        const errorInfo =
          err.response?.data?.message || "데이터베이스 연결 오류입니다.";
        alert(errorInfo);
        setErrorSpan(errorInfo);
      },
    });
  };

  const handleGoogleAuth = () => {
    window.open(process.env.REACT_APP_GOOGLE_AUTH_URL, "_self");
  };

  useEffect(() => {
    console.log("useEffect called from Login");
  }, []);

  return (
    <>
      <div className="login-form-container">
        <div className="login-form">
          <h1>로그인</h1>
          <form>
            <InputField
              label="아이디"
              type="text"
              id="username"
              state={[username, setUsername]}
              autoFocus={true}
            />
            <InputField
              label="비밀번호"
              type="password"
              id="password"
              state={[password, setPassword]}
            />
          </form>
          <AsyncButton
            styleObj={{ width: "400px", height: "40px" }}
            onClick={handleOnclickLoginBtn}
          >
            <span style={{ fontWeight: "600" }}>로그인</span>
          </AsyncButton>
          <span className="error-span" style={{ opacity: !errorSpan ? 0 : 1 }}>
            {errorSpan}
          </span>
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
    </>
  );
}

export default Login;
