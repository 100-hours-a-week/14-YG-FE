import { useState, useRef, useEffect } from "react";
import { useChatBotSSE } from "../../hooks/useChatBotSSE";
import * as S from "./ChatBot.styled";
import Moong from "../../assets/images/AdminMoong.png";
import RecommendCard from "../../components/chatBot/recommendCard/RecommendCard";
import { useUserStore } from "../../stores/useUserStore";
import ProductRecommend from "../../components/chatBot/productRecommend/ProductRecommend";
import {
  ProductRecommendProps,
  RecommendCardProps,
} from "../../types/chatBotType";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const { messages, isLoading, sendBotMessage, addUserMessage, addBotMessage } =
    useChatBotSSE();
  const user = useUserStore((s) => s.user);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(`
      안녕하세요! 뭉치면 산다 전문 챗봇입니다. 🤖<br><br>
      저와 함께 원하는 공구를 찾고, 세상에 없는 공구는 직접 만들어 보세요! <br><br>
      <p style="margin-top: 5px;">✅ <strong>이미 있는 공구 찾기</strong><br>
      뭉산에 올라온 공구를 찾아드릴게요.</p>
      <blockquote style="margin: 5px 0 10px 0; padding: 5px 10px; border-left: 3px solid #ddd; color: #555;">
        <code>"우유 공구 있어?"</code><br>
        <code>"천원 이하 간식 찾아줘"</code><br>
        <code>"지금 공구 뭐 있어?"</code>
      </blockquote>
      
      <p style="margin-top: 10px;">✨ <strong>새로운 공구 만들기</strong><br>
      원하는 상품의 이름을 알려주시면, 제가 URL을 찾아 공구를 만들어 드릴게요!</p>
      <blockquote style="margin: 5px 0 10px 0; padding: 5px 10px; border-left: 3px solid #ddd; color: #555;">
        <code>"콜라 공구 만들어줘"</code><br>
        <code>"[상품 URL] 이걸로 공구 만들어줘"</code><br>
        <code>"공구 만들고 싶어"</code>
      </blockquote>
      
      <p style="margin-top: 10px;">💬 그 외에도 궁금한 점이나 일상적인 대화도 환영이에요! <br>
      어떤 걸 도와드릴까요? 편하게 말씀해주세요!</p>
    `);
    }
  }, [messages, addBotMessage]);

  const handleSend = () => {
    if (!input.trim() || !user) return;

    addUserMessage(input.trim()); // ✅ 사용자 메시지 바로 추가
    sendBotMessage({ message: input.trim(), nickname: user.nickname });
    setInput("");
  };

  // 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <S.Container>
      <S.ChatPart>
        <S.MessageList>
          {messages.map((msg, idx) => {
            const content = msg.content;

            // ✅ STRUCTURED_RESULT_START 처리
            if (
              typeof content === "string" &&
              content.includes("STRUCTURED_RESULT_START")
            ) {
              const jsonText = content
                .split("STRUCTURED_RESULT_START")[1]
                .split("STRUCTURED_RESULT_END")[0];

              try {
                const parsed = JSON.parse(jsonText.trim());

                return (
                  <S.Message>
                    <S.StyledMoong src={Moong} />
                    <S.StructuredCardWrapper key={idx}>
                      {parsed.total_count === 0 ? (
                        <>
                          <S.CardHeader>
                            🔍 {parsed.query} 관련 공구가 없습니다.
                          </S.CardHeader>
                          <S.Info>
                            {parsed.query} 관련 공구를 생성해보세요.
                          </S.Info>
                        </>
                      ) : (
                        <>
                          <S.CardHeader>
                            🔍 {parsed.query} 관련 공구 검색 결과입니다.
                          </S.CardHeader>
                          <S.Info>
                            카드를 클릭하여 원하는 공구에 참여해보세요!
                          </S.Info>
                        </>
                      )}

                      <S.RowScrollContainer>
                        {parsed.results.map((item: RecommendCardProps) => (
                          <RecommendCard key={item.id} item={item} />
                        ))}
                      </S.RowScrollContainer>
                    </S.StructuredCardWrapper>
                  </S.Message>
                );
              } catch (err) {
                console.error("STRUCTURED_RESULT 파싱 실패", err);
              }
            }

            // ✅ PRODUCT_OPTIONS_START 처리
            if (
              typeof content === "string" &&
              msg.content.includes("PRODUCT_OPTIONS_START")
            ) {
              const jsonText = content
                .split("PRODUCT_OPTIONS_START")[1]
                .split("PRODUCT_OPTIONS_END")[0];

              try {
                const parsed = JSON.parse(jsonText.trim());

                return (
                  <S.Message>
                    <S.StyledMoong src={Moong} />
                    <S.StructuredCardWrapper key={idx}>
                      <p>{parsed.intro_text}</p>
                      <S.RowScrollContainer>
                        {parsed.options.map(
                          (option: ProductRecommendProps, i: number) => (
                            <ProductRecommend
                              key={option.id}
                              seq={i + 1}
                              option={option}
                            />
                          )
                        )}
                      </S.RowScrollContainer>
                      <S.OutroText>{parsed.outro_text}</S.OutroText>
                    </S.StructuredCardWrapper>
                  </S.Message>
                );
              } catch (err) {
                console.error("PRODUCT_OPTIONS 파싱 실패", err);
              }
            }

            // ✅ CREATE_PRODUCT_START 처리
            if (
              typeof content === "string" &&
              msg.content.includes("CREATE_PRODUCT_START")
            ) {
              const jsonText = content
                .split("CREATE_PRODUCT_START")[1]
                .split("CREATE_PRODUCT_END")[0];

              try {
                const parsed = JSON.parse(jsonText.trim());
                setTimeout(() => {
                  navigate("/writePost", { state: parsed });
                }, 0);
              } catch (err) {
                console.error("CREATE_PRODUCT 파싱 실패", err);
              }
            }

            // ✅ 일반 메시지
            return (
              <S.Message $isUser={msg.agent !== "chat"}>
                <S.StyledMoong src={Moong} $isUser={msg.agent !== "chat"} />
                <S.MessageBubble key={idx} $isUser={msg.agent !== "chat"}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                  />
                </S.MessageBubble>
              </S.Message>
            );
          })}
          {isLoading && (
            <S.Message>
              <S.StyledMoong src={Moong} />
              <S.MessageBubble key="loading">
                <S.LoadingDots>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </S.LoadingDots>
              </S.MessageBubble>
            </S.Message>
          )}
          <div ref={bottomRef} />
        </S.MessageList>
      </S.ChatPart>

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
