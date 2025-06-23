import { useNavigate, useParams } from "react-router-dom";
import { useSendMessageMutation } from "../../hooks/mutations/chat/useSendMessageMutation";
//import { useChatRoomStore } from "../../stores/useChatRoomStore";
import * as S from "./ChatRoom.styled";
import { useEffect, useRef, useState } from "react";
import { usePrevChatQuery } from "../../hooks/queries/useChatQuery";
import { useUserStore } from "../../stores/useUserStore";
import ChatBox from "../../components/chat/ChatBox";
import { ChatMessage } from "../../types/chatType";
import { useCurrentMessagePolling } from "../../hooks/useCurrentMessagePolling";

const ChatRoom = () => {
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const user = useUserStore((s) => s.user);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isInitialScroll = useRef(true);
  //const setTitle = useChatRoomStore((s) => s.setTitle);
  const { mutate: sendMessage } = useSendMessageMutation(Number(chatRoomId));
  const { data: prevMessages } = usePrevChatQuery(Number(chatRoomId));

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useCurrentMessagePolling(Number(chatRoomId), (newMessages) => {
    setMessages((prev) => [...prev, ...newMessages]);
  });

  useEffect(() => {
    if (prevMessages?.chatMessageResponses) {
      setMessages(prevMessages.chatMessageResponses);
    }
  }, [prevMessages]);

  useEffect(() => {
    if (bottomRef.current) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: isInitialScroll.current ? "auto" : "smooth",
        });
        isInitialScroll.current = false;
      }, 0); // 렌더 이후에 실행되도록 defer
    }
  }, [messages]);

  console.log("채팅 응답", prevMessages);
  if (!user) {
    alert("다시 로그인해주세요!");
    navigate("/");
    return null;
  }

  //setTitle();

  return (
    <S.Container>
      <S.ChatPart>
        {messages.map((message, idx) => {
          const prev = messages[idx - 1];
          const isContinuation = prev?.participantId === message.participantId;

          return (
            <ChatBox
              key={message.messageId}
              message={message}
              isContinuation={isContinuation}
              isMyMessage={user.nickname === message.nickname}
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
              e.preventDefault(); // 줄바꿈 방지
              if (message.trim()) {
                sendMessage({ content: message });
                setMessage("");
              }
            }
          }}
          placeholder={`${user.nickname}(으)로 대화해보세요.`}
        ></S.MessageBox>
        <S.StyledSendButton
          onClick={() => {
            sendMessage({ content: message });
            setMessage("");
          }}
        />
      </S.MessagePart>
    </S.Container>
  );
};

export default ChatRoom;
