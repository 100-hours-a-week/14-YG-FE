import { useNavigate, useParams } from "react-router-dom";
import { useSendMessageMutation } from "../../hooks/mutations/chat/useSendMessageMutation";
//import { useChatRoomStore } from "../../stores/useChatRoomStore";
import * as S from "./ChatRoom.styled";
import { useState } from "react";
import { usePrevChatQuery } from "../../hooks/queries/useChatQuery";
import { useUserStore } from "../../stores/useUserStore";
import ChatBox from "../../components/chat/ChatBox";

const ChatRoom = () => {
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  //const setTitle = useChatRoomStore((s) => s.setTitle);
  const { mutate: sendMessage } = useSendMessageMutation(Number(chatRoomId));
  const { data: prevMessages } = usePrevChatQuery(Number(chatRoomId));
  const [message, setMessage] = useState("");
  const user = useUserStore((s) => s.user);

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
        {prevMessages?.chatMessageResponses.map((message) => (
          <ChatBox key={message.messageId} message={message} />
        ))}
      </S.ChatPart>
      <S.MessagePart>
        <S.MessageBox
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`${user.nickname}(으)로 대화해보세요.`}
        ></S.MessageBox>
        <S.StyledSendButton onClick={() => sendMessage({ content: message })} />
      </S.MessagePart>
    </S.Container>
  );
};

export default ChatRoom;
