import { useState } from "react";
import { ChatBotResponse, SendMessageParams } from "../types/chatBotType";

export const useChatBotSSE = () => {
  const [messages, setMessages] = useState<ChatBotResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendBotMessage = async ({
    message,
    sessionId,
    nickname,
  }: SendMessageParams) => {
    setIsLoading(true);
    setMessages([]);

    const response = await fetch("http://localhost:8000/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      credentials: "include", // ✅ 쿠키 포함
      body: JSON.stringify({
        message,
        session_id: sessionId,
        user_name: nickname,
      }),
    });

    if (!response.ok || !response.body) {
      console.error("SSE 연결 실패", response.status);
      setIsLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";

    const read = async () => {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n\n");
        buffer = lines.pop() || ""; // 마지막 줄은 아직 미완성일 수 있음

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.replace("data: ", ""));
              setMessages((prev) => [...prev, json]);

              if (json.type === "completion") {
                setIsLoading(false);
              }
            } catch (err) {
              console.error("JSON 파싱 오류:", err, line);
            }
          }
        }
      }
    };

    read().catch((err) => {
      console.error("SSE 읽기 오류", err);
      setIsLoading(false);
    });
  };

  return { messages, isLoading, sendBotMessage };
};
