import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOrder } from "../../../api/order";
import { useModalStore } from "../../../stores/useModalStore";
import { AxiosError } from "axios";

export const useOrderMutation = (postId: number) => {
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postOrder,
    onSuccess: (data) => {
      console.log("주문 성공:", data);

      // ✅ post detail refetch
      queryClient.invalidateQueries({
        queryKey: ["postDetail", postId],
      });
      queryClient.invalidateQueries({ queryKey: ["hostAccount", postId] });
      queryClient.refetchQueries({ queryKey: ["chatList"] });
      queryClient.setQueryData(["orderDetail", postId], data);
      closeModal();
      openModal("success", { postId: postId });
      console.log(postId);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 409) {
          alert("이미 주문한 공구입니다.");
          closeModal();
        } else if (status === 403 || error.message === "Access Denied") {
          alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
          closeModal();
          openModal("login");
        } else if (status === 400) {
          alert("앗! 한발 늦은 것 같아요... 방금 모집이 마감되었어요😭");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다. 인스타그램으로 문의해주세요.");
      }

      // ✅ post detail refetch
      queryClient.invalidateQueries({
        queryKey: ["postDetail", postId],
      });
    },
  });
};
