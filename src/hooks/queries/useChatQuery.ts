import { useQuery } from "@tanstack/react-query";
import { ChatListResponse, PrevChatList } from "../../types/chatType";
import { getChatList, getPrevMessage } from "../../api/chat";

export const useChatListQuery = () => {
  return useQuery<ChatListResponse>({
    queryKey: ["chatList"],
    queryFn: () => getChatList(),
  });
};

export const usePrevChatQuery = (chatRoomId: number, cursorId?: string) => {
  return useQuery<PrevChatList>({
    queryKey: ["prevChat", chatRoomId, cursorId],
    queryFn: () => getPrevMessage(chatRoomId, cursorId),
    enabled: !!chatRoomId,
  });
};
