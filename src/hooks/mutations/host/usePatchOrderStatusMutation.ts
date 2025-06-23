import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchOrderStatusBody } from "../../../types/hostType";
import { patchOrderStatus } from "../../../api/host";
import { useModalStore } from "../../../stores/useModalStore";

export const usePatchOrderStatusMutation = (postId: number) => {
  const closeModal = useModalStore((s) => s.closeModal);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: patchOrderStatusBody[]) => patchOrderStatus(data),
    onSuccess: () => {
      console.log("상태변경 성공");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["partiList", postId] });
    },
    onError: (err) => {
      console.error("참여자 상태 변경 실패", err);
      alert(
        "참여자 상태 변경에 오류가 발생했습니다.\n잠시후 다시 시도해주세요"
      );
    },
  });
};
