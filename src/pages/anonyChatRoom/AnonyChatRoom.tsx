import { useRef, useState } from "react";
import { useChatSocket } from "../../hooks/useChatSocket";
import ChatRoomUI from "../../components/chat/chatRoomUI/ChatRoomUI";
import { useLocation, useParams } from "react-router-dom";
// import * as S from "./AnonyChatRoom.styled"; // 필요 시 스타일링

const AnonyChatRoom = () => {
  const { postId } = useParams();
  const location = useLocation();
  const aliasId = location.state?.aliasId;

  const [message, setMessage] = useState("");

  // 웹소켓 연결 및 메시지 수신
  const { messages, sendMessage } = useChatSocket({
    postId: Number(postId),
    participantId: aliasId,
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSend = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage("");
      scrollToBottom();
    }
  };

  return (
    <ChatRoomUI
      userNickname={`익명#${aliasId}`} // UI에 표시용
      messages={messages}
      message={message}
      setMessage={setMessage}
      onSend={onSend}
      bottomRef={bottomRef}
      chatContainerRef={chatContainerRef}
      topRef={() => {}}
    />
  );
};

export default AnonyChatRoom;
