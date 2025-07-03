import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  ChatListParams,
  ChatListResponse,
  PrevChatList,
  PrevChatParams,
} from "../../types/chatType";
import { getChatList, getPrevMessage } from "../../api/chat";

export const useInfiniteChatList = () => {
  return useInfiniteQuery<
    ChatListResponse, // 각 페이지 응답 타입
    Error, // 에러 타입
    InfiniteData<ChatListResponse>, // 전체 데이터 타입
    [string], // queryKey 타입
    ChatListParams
  >({
    queryKey: ["chatList"],
    queryFn: ({ pageParam }) => {
      const cursorParam = pageParam ?? {};
      const params = {
        ...cursorParam,
        limit: 10,
      };

      console.log("💬 채팅방 요청 params:", params);
      return getChatList(params);
    },
    initialPageParam: {},
    getNextPageParam: (lastPage) => {
      if (!lastPage?.hasMore) return undefined;

      return {
        cursorJoinedAt: lastPage.nextCursorJoinedAt,
      };
    },
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
