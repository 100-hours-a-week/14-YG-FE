import { ChatMessage } from "../../../types/chatType";
import ChatBox from "../ChatBox";
import * as S from "./ChatRoomUI.styled";

interface ChatRoomUIProps {
  userNickname: string;
  messages: ChatMessage[];
  message: string;
  setMessage: (v: string) => void;
  onSend: () => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
  topRef: (node?: Element | null) => void;
}

const ChatRoomUI = ({
  userNickname,
  messages,
  message,
  setMessage,
  onSend,
  bottomRef,
  chatContainerRef,
  topRef,
}: ChatRoomUIProps) => {
  return (
    <S.Container>
      <S.ChatPart ref={chatContainerRef}>
        <div ref={topRef} style={{ height: 1 }} />
        {messages.map((message, idx) => {
          const prev = messages[idx - 1];
          const isContinuation = prev?.participantId === message.participantId;
          return (
            <ChatBox
              key={message.messageId}
              message={message}
              isContinuation={isContinuation}
              isMyMessage={userNickname === message.nickname}
            />
          );
        })}
        <div ref={bottomRef} />
      </S.ChatPart>

      <S.MessagePart>
        <S.MessageBox
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder={`${userNickname}(으)로 대화해보세요.`}
        />
        <S.StyledSendButton onClick={onSend} />
      </S.MessagePart>
    </S.Container>
  );
};

export default ChatRoomUI;
