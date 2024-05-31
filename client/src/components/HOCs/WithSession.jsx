import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const WithSession = (Component) => {
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  console.log(cookies);

  useEffect(() => {}, []);
  return <Component />;
};
