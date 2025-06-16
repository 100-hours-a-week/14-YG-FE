import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "../../../api/order";

export const useCancelOrderMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteOrder(postId),
    onSuccess: () => {
      alert("주문 취소가 완료되었습니다. 3일 이내에 환불될 예정입니다.");
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
      queryClient.invalidateQueries({ queryKey: ["hostAccount", postId] });
    },
    onError: (error) => {
      alert("앗! 주문 취소를 실패했습니다 😓");
      console.error("주문 취소 실패", error);
    },
  });
};
