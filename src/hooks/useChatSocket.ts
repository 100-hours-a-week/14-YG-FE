import { useEffect, useRef, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { ChatMessage } from "../types/chatType";

interface UseChatSocketProps {
  postId: number;
  participantId: number;
}

export const useChatSocket = ({
  postId,
  participantId,
}: UseChatSocketProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const clientRef = useRef<ReturnType<typeof Stomp.over> | null>(null);

  useEffect(() => {
    const socket = new SockJS("https://dev.moongsan.com/ws/chat") as WebSocket; // ✅ SockJS로 연결
    const client = Stomp.over(socket);

    client.debug = () => {}; // 로그 끄기
    client.reconnectDelay = 5000; // 자동 재연결

    const topic = `/topic/chat-anon/${postId}`;

    client.connect({}, () => {
      client.subscribe(topic, (frame) => {
        const msg: ChatMessage = JSON.parse(frame.body);
        setMessages((prev) => [...prev, msg]);
      });
    });

    clientRef.current = client;

    return () => {
      client.disconnect();
    };
  }, [postId]);

  const sendMessage = (content: string) => {
    if (!clientRef.current?.connected) {
      console.warn("WebSocket 연결 안 됨");
      return;
    }

    const payload = {
      postId,
      participantId,
      message: content,
    };

    clientRef.current.send(
      "/pub/chat-anon/message",
      {},
      JSON.stringify(payload)
    );
  };

  return { messages, sendMessage };
};
