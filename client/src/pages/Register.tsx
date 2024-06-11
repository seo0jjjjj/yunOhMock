import { useNavigate } from "react-router-dom";
import AsyncButton from "../components/asyncButton/AsyncButton";
import InputField from "../components/inputField/InputField";
import "../style/register.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { checkUsernameAvailability, register } from "../util/axiosService";
import React from 'react';

const SERVER_UPLOAD_URL = `${process.env.REACT_APP_SERVER_URL}uploads/samples/`;

function Register() {
  const navigate = useNavigate();

  const inputRef = useRef();
  const usernameRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileOption, setProfileOption] = useState(SERVER_UPLOAD_URL + "profile_sample_02.png");
  const [errorSpans, setErrorSpans] = useState({});

  const [Inputvaild, setInputvaild] = useState({
    username: false,
    password: false,
    inputEmptyCheck: false,
  });



  function isEmptyOrWhitespace(str) {
    // 문자열의 모든 공백을 제거한 후, 빈 문자열인지 확인
    return /^\s*$/.test(str);
  }

  const handleRegisterBtn = async () => {
    //check state is empty
    if (isEmptyOrWhitespace(username) || isEmptyOrWhitespace(password) || isEmptyOrWhitespace(confirmedPassword) || isEmptyOrWhitespace(nickname) || isEmptyOrWhitespace(profileOption)) {
      alert("입력하지 않은 정보가 있습니다.");
      return;
    }
    setInputvaild((prev) => ({ ...prev, inputEmptyCheck: true }));

    //check state is vaild
    if (!Inputvaild.username) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    if (!Inputvaild.password) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    // 회원가입 요청
    register({
      username,
      password,
      nickname,
      imgURL: profileOption,
    }, {
      onSuccess: (res) => {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      },
      onFailure: (err) => {
        alert(err?.response?.data?.message || "서버가 응답하지 않습니다.");
        console.log(err);
      }
    }
    );

  };

  const profileOptions = useMemo(
    () => [
      { src: SERVER_UPLOAD_URL + "profile_sample_01.png" },
      { src: SERVER_UPLOAD_URL + "profile_sample_02.png" },
      { src: SERVER_UPLOAD_URL + "profile_sample_03.png" },
      { src: SERVER_UPLOAD_URL + "profile_sample_04.png" },
    ],
    [SERVER_UPLOAD_URL]
  );

  useEffect(() => {
    if (password !== confirmedPassword) {
      setErrorSpans((prev) => ({ ...prev, passwordVaildError: "비밀번호가 일치하지 않습니다." }));
      return;
    }

    setInputvaild((prev) => ({ ...prev, password: true }));
    setErrorSpans((prev) => ({ ...prev, passwordVaildError: "" }));
  }, [password, confirmedPassword]);



  // 유저 이름 중복확인 검사
  const handleUsernameDuplication = async (e) => {
    e.preventDefault();
    console.log("request created");
    // 유저 이름 중복확인 요청
    await checkUsernameAvailability(username, {
      onSuccess: (res) => {
        if (res?.data?.available) {
          // 중복되지 않은 유저 이름
          alert("사용 가능한 아이디입니다.");
          setErrorSpans((prev) => ({ ...prev, usernameDuplicationError: "" }));
          usernameRef.current.classList.remove('wrong-input');
          setInputvaild((prev) => ({ ...prev, username: true }));

        } else {
          // 중복된 유저 이름
          alert("중복된 사용자 아이디가 존재합니다.");
          usernameRef.current.focus();
          usernameRef.current.classList.add('wrong-input');
          Inputvaild.username = false;

          setErrorSpans((prev) => ({ ...prev, usernameDuplicationError: "중복된 사용자 아이디가 존재합니다." }));
          setInputvaild((prev) => ({ ...prev, username: false }));
        }

      },
      onFailure: (err) => {
        // 중복된 유저 이름
        console.log(err?.response?.data || err);
        alert(err);
      },
    });
  };


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
              rep={usernameRef}
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
                onClick={handleUsernameDuplication}
              >
                <span style={{ fontWeight: "400", fontSize: "10px" }}>
                  중복 확인
                </span>
              </AsyncButton>
              <span className="error-span" style={{ opacity: 1 }}>
                {errorSpans?.usernameDuplicationError}
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
                style={{ opacity: !errorSpans?.passwordVaildError ? 0 : 1 }}
              >
                {errorSpans?.passwordVaildError}
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
                <div key={option.src}>
                  <img src={option.src} alt="" className="profile-img" />
                  <input
                    type="radio"
                    value={option.src}
                    onChange={(e) => setProfileOption(option.src)}
                    name="profile-img"
                    checked={option.src === profileOption}
                  ></input>
                </div>
              ))}
            </div>
          </form>
          <AsyncButton styleObj={{ width: "400px", height: "40px" }} onClick={handleRegisterBtn}>
            <span style={{ fontWeight: "600" }}>회원가입</span>

          </AsyncButton>
        </div>
      </div >
    </>
  );
}

export default Register;
