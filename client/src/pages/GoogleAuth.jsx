import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function GoogleAuth() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const [isInit, setIsInit] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if(isInit) return
      setIsInit(true);
      console.log("code is : "+ code);

      // called only once
      axios.post("http://localhost:8080/api/auth/login-via-google", {code: code})
      // 로그인 성공
      .then((res) => {
        console.log(res);
        alert("로그인에 성공하였습니다.");
        setIsLoginSuccess(true);
        navigate("/");

      }).catch((err) => {
        // 로그인 실패
        console.log(err);
        setIsLoginSuccess(false);
        alert("로그인에 실패했습니다.");
        navigate("/login");
      }); 


    }, []);


    return (
      <div>
        <h1>Loading...</h1>
        {"code is : "+ code}
      </div>
    );
  }

  export default GoogleAuth;