import { useState } from "react";
import { ChatBotResponse, SendMessageParams } from "../types/chatBotType";

export const useChatBotSSE = () => {
  const [messages, setMessages] = useState<ChatBotResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const sendBotMessage = async ({ message, nickname }: SendMessageParams) => {
    setIsLoading(true);

    const response = await fetch("http://172.20.4.252:8101/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      //credentials: "include", // ✅ 쿠키 포함
      body: JSON.stringify({
        message,
        session_id: sessionId,
        nickname: nickname,
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

              if (json.type === "ai_response") {
                // 🔥 session_id 저장
                if (json.session_id) {
                  setSessionId(json.session_id);
                }
                setIsLoading(false); // ✅ ai_response가 오면 로딩 해제
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
  // ✅ 사용자가 직접 메시지 추가
  const addUserMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "user_message",
        content: message,
        agent: "user",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const addBotMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        type: "bot_message",
        content,
        agent: "chat",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return { messages, isLoading, sendBotMessage, addBotMessage, addUserMessage };
};
