import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
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

export const useInfinitePastChat = (chatRoomId: number) => {
  return useInfiniteQuery<
    PrevChatList, // 각 페이지 데이터
    Error,
    InfiniteData<PrevChatList>,
    [string, number], // queryKey
    PrevChatParams
  >({
    queryKey: ["prevChatInfinite", chatRoomId],
    queryFn: ({ pageParam }) => {
      const cursorParam = pageParam ?? {};

      console.log("🌀 [채팅 무한스크롤] pageParam:", pageParam);
      console.log(
        "📤 [채팅 무한스크롤] getPrevMessage로 넘길 파라미터:",
        cursorParam
      );

      return getPrevMessage(chatRoomId, cursorParam);
    },
    initialPageParam: {},
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasBefore) return undefined;

      return {
        cursorMessageIdAfter: lastPage.beforeCursorId,
      };
    },
    enabled: !!chatRoomId,
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
