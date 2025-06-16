import { useParams } from "react-router-dom";
import { useSendMessageMutation } from "../../hooks/mutations/chat/useSendMessageMutation";
//import { useChatRoomStore } from "../../stores/useChatRoomStore";
import * as S from "./ChatRoom.styled";
import { useState } from "react";
import { usePrevChatQuery } from "../../hooks/queries/useChatQuery";

const ChatRoom = () => {
  const { chatRoomId } = useParams();
  //const setTitle = useChatRoomStore((s) => s.setTitle);
  const { mutate: sendMessage } = useSendMessageMutation(Number(chatRoomId));
  const { data: prevMessages } = usePrevChatQuery(Number(chatRoomId));
  const [message, setMessage] = useState("");

  console.log(prevMessages);

  //setTitle();

  return (
    <S.Container>
      <S.ChatPart></S.ChatPart>
      <S.MessagePart>
        <S.MessageBox
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="이지훈(으)로 대화해보세요."
        ></S.MessageBox>
        <S.StyledSendButton onClick={() => sendMessage({ content: message })} />
      </S.MessagePart>
    </S.Container>
  );
};

export default ChatRoom;
