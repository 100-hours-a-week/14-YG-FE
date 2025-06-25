import { useNavigate } from "react-router-dom";
import { useKakaoLoginQuery } from "../hooks/queries/useKakaoLoginQuery";
import { useEffect } from "react";
import Loading from "../components/common/loading/Loding";
import { useUserStore } from "../stores/useUserStore";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const redirectUri = window.location.origin + "/kakao/callback";

  const { data: loginData, isLoading } = useKakaoLoginQuery({
    code: String(code),
    redirectUri,
  });

  useEffect(() => {
    if (!loginData) return;

    switch (loginData.message) {
      case "로그인에 성공했습니다.":
        // 기존 유저: 홈으로
        useUserStore.getState().setUser(loginData.data); // 유저 저장
        navigate("/");
        break;

      case "회원가입이 필요합니다.": {
        const { email, oauthPassword } = loginData.data;

        // 서비스 로그인과 동일하게 저장
        localStorage.setItem(
          "signupStep1",
          JSON.stringify({
            email,
            password: oauthPassword,
          })
        );
        navigate("/signupInfo");
        break;
      }

      case "OAuth 요청 중 오류 발생":
      case "내부 서버 오류 발생":
      default:
        alert("로그인 처리 중 오류가 발생했습니다.\n다시 시도해주세요.");
        navigate("/");
        break;
    }
  }, [loginData, navigate]);

  if (isLoading) return <Loading message="로그인 중입니다..." />;

  return <Loading message="로그인 중입니다..." />;
};

export default KakaoCallback;
