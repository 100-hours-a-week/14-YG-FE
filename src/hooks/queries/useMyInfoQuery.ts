import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMyInfo } from "../../api/user";
import { useUserStore } from "../../stores/useUserStore";

export const useMyInfoQuery = () => {
  const { setUser, clearUser, user } = useUserStore();
  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: user !== null,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data);
      console.log("로그인");
      setUser(data);
    } else if (isError) {
      queryClient.removeQueries({ queryKey: ["myInfo"] });
      queryClient.removeQueries({ queryKey: ["hostAccount"] });
      console.log("로그아웃");
      clearUser(); // 실패 시 로그아웃 처리
    }
  }, [isSuccess, isError, data, setUser, clearUser, queryClient]);

  return { data, isSuccess, isLoading }; // ✅ isLoading도 추가
};
