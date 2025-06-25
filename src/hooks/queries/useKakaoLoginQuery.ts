import { useQuery } from "@tanstack/react-query";
import { kakaoLogin } from "../../api/user";

interface KakaoLoginParams {
  code: string;
  redirectUri: string;
}

export const useKakaoLoginQuery = ({ code, redirectUri }: KakaoLoginParams) => {
  return useQuery({
    queryKey: ["kakao-login", code],
    queryFn: () => kakaoLogin(redirectUri, code),
    enabled: !!code && !!redirectUri, // ✅ code와 url이 다 있어야 실행
  });
};
