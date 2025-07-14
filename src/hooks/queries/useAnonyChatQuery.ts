import { useQuery } from "@tanstack/react-query";
import { getAnonyMessage } from "../../api/chat";
import { AnonymousChat } from "../../types/chatType";

export const useAnonyChatQuery = (chatRoomId: number) => {
  return useQuery<AnonymousChat[]>({
    queryKey: ["anonymousChat", chatRoomId],
    queryFn: () => getAnonyMessage(chatRoomId),
    enabled: !!chatRoomId,
  });
};
