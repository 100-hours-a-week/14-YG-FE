//import { useNavigate } from "react-router-dom";
import { useKakaoLoginQuery } from "../hooks/queries/useKakaoLoginQuery";

const KakaoCallback = () => {
  // const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const { data: loginData } = useKakaoLoginQuery(String(code));
  console.log(loginData);
  console.log(code);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoCallback;
