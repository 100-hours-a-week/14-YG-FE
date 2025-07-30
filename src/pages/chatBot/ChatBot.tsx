import { useState, useRef, useEffect } from "react";
import { useChatBotSSE } from "../../hooks/useChatBotSSE";
import * as S from "./ChatBot.styled";
import Moong from "../../assets/images/AdminMoong.png";
import RecommendCard from "../../components/chatBot/recommendCard/RecommendCard";
import { useUserStore } from "../../stores/useUserStore";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const { messages, sendBotMessage } = useChatBotSSE();
  const user = useUserStore((s) => s.user);
  const bottomRef = useRef<HTMLDivElement>(null);

  //const sessionId = "5ddbcd8e-35f4-4863-ba3f-f0983f01afa7"; // 실제론 user 기반 생성 추천

  const handleSend = () => {
    if (!input.trim() || !user) return;
    sendBotMessage({ message: input, nickname: user.nickname });
    setInput("");
  };

  // 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <S.Container>
      <S.ChatPart>
        <S.StyledMoong src={Moong} />

        <S.MessageList>
          {messages.map((msg, idx) => (
            <S.MessageBubble key={idx} isUser={msg.agent !== "chat"}>
              {msg.content}
            </S.MessageBubble>
          ))}
          <div ref={bottomRef} />
        </S.MessageList>
      </S.ChatPart>

      {/* 추천 카드: 추후 STRUCTURED_RESULT 파싱해서 자동 노출 */}
      <S.RowScrollContainer>
        <RecommendCard />
        <RecommendCard />
      </S.RowScrollContainer>

      <S.MessagePart>
        <S.MessageBox
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="무엇이든 물어보살~"
        />
        <S.StyledSendButton onClick={handleSend} />
      </S.MessagePart>
    </S.Container>
  );
};

export default ChatBot;
