import { PrevChat } from "../../types/chatType";
import { getImageUrl } from "../../utils/image";
import 달뭉 from "../../assets/images/달뭉.webp";
import * as S from "./ChatBox.styled";

interface ChatBoxProps {
  message: PrevChat;
}

const ChatBox = ({ message }: ChatBoxProps) => {
  return (
    <S.Container>
      <S.ProfileImg
        src={
          message.profileImageKey ? getImageUrl(message.profileImageKey) : 달뭉
        }
        alt="프로필 이미지"
      />
      <S.MessagePart>
        <S.Nickname>{message.nickname}</S.Nickname>
        <S.Message> {message.messageContent}</S.Message>
      </S.MessagePart>
    </S.Container>
  );
};

export default ChatBox;
