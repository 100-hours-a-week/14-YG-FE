import { useParams } from "react-router-dom";
import { useSendMessageMutation } from "../../hooks/mutations/chat/useSendMessageMutation";
import * as S from "./ChatBot.styled";
import { useState } from "react";
import Moong from "../../assets/images/AdminMoong.png";
//import { useUserStore } from "../../stores/useUserStore";

const ChatRoom = () => {
  const { chatRoomId } = useParams();
  // const navigate = useNavigate();
  const { mutate: sendMessage } = useSendMessageMutation(Number(chatRoomId));
  const [message, setMessage] = useState("");
  //const user = useUserStore((s) => s.user);

  {
    /*if (!user) {
    alert("다시 로그인해주세요!");
    navigate("/");
    return null;
  }*/
  }

  return (
    <S.Container>
      <S.ChatPart>
        <S.StyledMoong src={Moong} />
        람람
      </S.ChatPart>
      <S.MessagePart>
        <S.MessageBox
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="무엇이든 물어보살~"
        ></S.MessageBox>
        <S.StyledSendButton onClick={() => sendMessage({ content: message })} />
      </S.MessagePart>
    </S.Container>
  );
};
export default ChatRoom;
