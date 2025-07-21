import { useEffect, useRef, useState } from "react";
import { Client, Stomp } from "@stomp/stompjs";
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
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = Stomp.over(
      () => new WebSocket("ws://localhost:8080/ws/chat")
    );
    client.debug = () => {};

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
    const payload = {
      postId,
      participantId,
      messageContent: content,
    };

    const destination = "/pub/chat-anon/message";
    clientRef.current?.send(destination, {}, JSON.stringify(payload));
  };

  return { messages, sendMessage };
};
