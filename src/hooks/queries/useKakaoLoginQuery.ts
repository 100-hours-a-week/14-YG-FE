import { useQuery } from "@tanstack/react-query";
import { kakaoLogin } from "../../api/user";

export const useKakaoLoginQuery = (code: string) => {
  return useQuery({
    queryKey: ["kakaoLogin", code],
    queryFn: () => kakaoLogin(code),
    enabled: !!code,
  });
};
