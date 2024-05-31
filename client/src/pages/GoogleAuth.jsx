import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { googleAuth } from "../util/axiosService";

function GoogleAuth() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const [isInit, setIsInit] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const navigate = useNavigate();

  googleAuth(
    { code },
    {
      onSuccess: (res) => {
        console.log(res);
        alert("로그인에 성공하였습니다.");
        setIsLoginSuccess(true);
        navigate("/");
      },
      onFailure: (err) => {
        console.log(err);
        alert("로그인에 실패했습니다.");
        setIsLoginSuccess(false);
        navigate("/login");
      },
    }
  );

  return (
    <div>
      <h1>Loading...</h1>
      {"code is : " + code}
    </div>
  );
}

export default GoogleAuth;
