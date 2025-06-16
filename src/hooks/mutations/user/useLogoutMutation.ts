import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../stores/useUserStore";

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((s) => s.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      alert(data.message);
      clearUser();
      queryClient.removeQueries({ queryKey: ["myInfo"] });
      navigate("/");
    },
    onError: (error) => {
      alert("앗! 로그아웃에 실패했습니다 😓");
      console.error("로그아웃 실패", error);
    },
  });
};
