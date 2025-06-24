import { useQuery } from "@tanstack/react-query";
import {
  ChatListResponse,
  PrevChatList,
  PrevChatParams,
} from "../../types/chatType";
import { getChatList, getPrevMessage } from "../../api/chat";

export const useChatListQuery = () => {
  return useQuery<ChatListResponse>({
    queryKey: ["chatList"],
    queryFn: () => getChatList(),
  });
};

export const usePrevChatQuery = (
  chatRoomId: number,
  params?: PrevChatParams
) => {
  return useQuery<PrevChatList>({
    queryKey: ["prevChat", chatRoomId, params],
    queryFn: () => getPrevMessage(chatRoomId, params),
    enabled: !!chatRoomId,
  });
};
