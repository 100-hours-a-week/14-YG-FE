import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../../stores/useToastStore";
import { editPassword, editProfile } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { EditProfileRequest } from "../../../types/userType";

export const useEditInfoMutation = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: EditProfileRequest) => editProfile(data),
    onSuccess: () => {
      showToast("회원정보가 변경되었습니다.");
      navigate("/mypage");
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (err) => {
      console.error("회원정보 변경 실패:", err);
    },
  });
};

export const useEditPasswordMutation = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (password: string) => editPassword(password),
    onSuccess: () => {
      showToast("비밀번호가 변경되었습니다.");
      navigate("/editProfile");
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (err) => {
      console.error("회원정보 변경 실패:", err);
    },
  });
};
