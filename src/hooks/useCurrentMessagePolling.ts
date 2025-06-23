import { useEffect, useRef } from "react";
import { getCurrentMessage } from "../api/chat";
import { ChatMessage } from "../types/chatType"; // 여긴 너의 메시지 타입으로 수정
import { AxiosError } from "axios";

export const useCurrentMessagePolling = (
  chatRoomId: number,
  onNewMessages: (data: ChatMessage[]) => void
) => {
  const isPolling = useRef(true);

  useEffect(() => {
    const poll = async () => {
      try {
        const data = await getCurrentMessage(chatRoomId);

        if (data.length > 0) {
          onNewMessages(data);
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === 408) {
          // 정상 타임아웃
        } else {
          console.error("💥 Polling error:", err);
        }
      }

      if (isPolling.current) {
        setTimeout(() => poll(), 500);
      }
    };

    poll();
    return () => {
      isPolling.current = false;
    };
  }, [chatRoomId, onNewMessages]);
};
