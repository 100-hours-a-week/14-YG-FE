import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMyInfo } from "../../api/user";
import { useUserStore } from "../../stores/useUserStore";

export const useMyInfoQuery = () => {
  const { setUser, clearUser } = useUserStore();

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data);
    } else if (isError) {
      clearUser(); // 실패 시 로그아웃 처리
    }
  }, [isSuccess, isError, data, setUser, clearUser]);

  return { data, isSuccess, isLoading }; // ✅ isLoading도 추가
};
