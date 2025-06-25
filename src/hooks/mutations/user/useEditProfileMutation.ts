import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../../stores/useToastStore";
import { editAccount, editPassword, editProfile } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import {
  ConfirmAccountParams,
  EditProfileRequest,
} from "../../../types/userType";

export const useEditInfoMutation = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditProfileRequest) => editProfile(data),
    onSuccess: () => {
      showToast("회원정보가 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (err) => {
      if (err instanceof Error) {
        alert(err.message);
      }
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
      console.error("비밀번호 변경 실패:", err);
    },
  });
};

export const useEditAccountMutation = () => {
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ConfirmAccountParams) => editAccount(data),
    onSuccess: () => {
      showToast("계좌정보가 변경되었습니다.");
      navigate("/editProfile");
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
    onError: (err) => {
      console.error("계좌정보 변경 실패:", err);
    },
  });
};
