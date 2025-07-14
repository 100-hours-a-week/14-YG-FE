import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMessage } from "../../../api/chat";

export const useSendMessageMutation = (chatRoomId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postMessage(chatRoomId, content),
    onSuccess: (data) => {
      console.log("메세지 전송 성공:", data);
      queryClient.invalidateQueries({ queryKey: ["prevChat", chatRoomId] });
    },
    onError: (err) => {
      console.error("메세지 전송 실패", err);
      alert("메세지 전송에 실패했습니다.");
    },
  });
};
