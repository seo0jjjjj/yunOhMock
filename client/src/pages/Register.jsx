import { useNavigate } from "react-router-dom";
import AsyncButton from "../components/asyncButton/AsyncButton";
import InputField from "../components/inputField/InputField";
import "../style/register.css";
import { useEffect, useMemo, useRef, useState } from "react";

function Register() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileOption, setProfileOption] = useState("option4");
  const [errorSpan, setErrorSpan] = useState("");

  const profileOptions = useMemo(
    () => [
      { src: "profile_sample_01.png", value: "option1" },
      { src: "profile_sample_02.png", value: "option2" },
      { src: "profile_sample_03.png", value: "option3" },
      { src: "profile_sample_04.png", value: "option4" },
    ],
    []
  );

  useEffect(() => {
    if (password !== confirmedPassword) {
      setErrorSpan("비밀번호가 일치하지 않습니다.");
      return;
    }
    setErrorSpan("");
  }, [password, confirmedPassword]);

  return (
    <>
      <div className="register-form-container">
        <div className="register-form">
          <h1>회원가입</h1>
          <form>
            <InputField
              label="아이디"
              type="text"
              id="username"
              state={[username, setUsername]}
              autoFocus={true}
            >
              <AsyncButton
                styleObj={{
                  paddingInline: "1em",
                  height: "25px",
                  position: "absolute",
                  right: "0",
                  top: "0",
                  marginTop: "5px",
                  marginRight: "5px",
                  borderRadius: "60px",
                }}
              >
                <span style={{ fontWeight: "400", fontSize: "10px" }}>
                  중복 확인
                </span>
              </AsyncButton>
              <span className="error-span" style={{ opacity: 1 }}>
                {"아 기모찌"}
              </span>
            </InputField>

            <InputField
              label="비밀번호"
              type="password"
              id="password"
              state={[password, setPassword]}
            />
            <InputField
              label="비밀번호 확인"
              type="password"
              id="check-password"
              state={[confirmedPassword, setConfirmedPassword]}
            >
              <span
                className="error-span"
                style={{ opacity: !errorSpan ? 0 : 1 }}
              >
                {errorSpan}
              </span>
            </InputField>
            <InputField
              label="닉네임"
              type="text"
              id="nickname"
              state={[nickname, setNickname]}
            />

            <span className="label-text">프로필 이미지 선택</span>
            <div className="img-container">
              {profileOptions.map((option) => (
                <div key={option.value}>
                  <img src={option.src} alt="" className="profile-img" />
                  <input
                    type="radio"
                    value={option.value}
                    onChange={(e) => setProfileOption(option.value)}
                    name="profile-img"
                    checked={option.value === profileOption}
                  ></input>
                </div>
              ))}
            </div>
          </form>
          <AsyncButton styleObj={{ width: "400px", height: "40px" }}>
            <span style={{ fontWeight: "600" }}>회원가입</span>
          </AsyncButton>
        </div>
      </div>
    </>
  );
}

export default Register;
