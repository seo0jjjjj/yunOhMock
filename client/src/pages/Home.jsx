import React, { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { UserInfoContext } from "../context/UserInfoContext";
import { getSession } from "../util/axiosService";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "connect.sid",
    "access_token",
  ]);
  const { dispatch, userInfo, isLoggedIn } = useContext(UserInfoContext);

  useEffect(() => {
    console.log("cookies");
    console.log(cookies);
    if (!cookies.access_token && isLoggedIn) {
      dispatch({ type: "LOGOUT" });
    }
    if (!cookies["connect.sid"]) {
      getSession({
        onSuccess: (res) => {
          console.log("session", res.data);
        },
        onFailure: (err) => {
          console.log(err);
        },
      });
    }
    console.log(cookies.access_token);
  }, []);
  return (
    <>
      <h1>helloworld</h1>
    </>
  );
}
