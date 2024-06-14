import axios from "axios";

/**
 * 해당 토큰이 유효한지 구글을 통해 확인하는 함수
 * @param {string} code 
 * @returns {string} access_token
 */
export async function validateGoogleToken(code) {
  try {
    //토큰 발급 받기
    const googleTokenRequest = await axios.post("https://oauth2.googleapis.com/token",{
      client_id: Config.get("GOOGLE_CLIENT_ID"), 
      client_secret: Config.get("GOOGLE_CLIENT_SECRET"),
      redirect_uri: Config.get("GOOGLE_REDIRECT_URI"),
      code,
      grant_type: "authorization_code"
    }
  );
    console.log(`[loginViaGoogle] access_token 가져오기 성공 \n(access_token : ${googleTokenRequest.data.access_token})`);
    return googleTokenRequest.data.access_token;
  }catch(err){
    console.log("[loginViaGoogle] access_token 가져오기 실패");
    throw new Error("구글 로그인 토큰이 유효하지 않습니다.");
  }
}