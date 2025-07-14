import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "../../../stores/useModalStore";
import { useUserStore } from "../../../stores/useUserStore";
import { login } from "../../../api/user";

export const useLoginMutation = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login, // ✅ 로그인 요청 보내는 함수
    onSuccess: (res) => {
      console.log(res);
      alert(`반갑습니다. ${res.nickname}님🥳`);
      useUserStore.getState().setUser(res); // 유저 저장
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      closeModal(); // 모달 닫기
    },
    onError: (err) => {
      if (err instanceof Error) {
        if (err.message === "응답에 data가 없습니다") {
          alert("서버 응답이 올바르지 않습니다. 관리자에게 문의해주세요.");
        } else {
          alert("이메일 또는 비밀번호를 확인해주세요.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    },
  });
};
