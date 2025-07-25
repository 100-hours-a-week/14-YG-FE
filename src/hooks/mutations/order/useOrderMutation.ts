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
      queryClient.setQueryData(["orderDetail", postId], data);
      closeModal();
      openModal("success", { postId: postId });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;

        alert(
          message ||
            "알 수 없는 오류가 발생했습니다. 인스타그램으로 문의해주세요."
        );
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
