import { useQuery } from "@tanstack/react-query";
import { kakaoLogin } from "../../api/user";

export const useKakaoLoginQuery = () => {
  return useQuery({
    queryKey: ["kakaoLogin"],
    queryFn: () => kakaoLogin(),
  });
};
