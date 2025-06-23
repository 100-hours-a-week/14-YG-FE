import { getImageUrl } from "../../utils/image";
import 달뭉 from "../../assets/images/달뭉.webp";
import * as S from "./ChatBox.styled";
import { ChatMessage } from "../../types/chatType";

interface ChatBoxProps {
  message: ChatMessage;
  isContinuation: boolean;
  isMyMessage: boolean;
}

const ChatBox = ({ message, isContinuation, isMyMessage }: ChatBoxProps) => {
  return (
    <S.Container $isMyMessage={isMyMessage}>
      <S.ProfileImg
        src={
          message.profileImageKey ? getImageUrl(message.profileImageKey) : 달뭉
        }
        alt="프로필 이미지"
        $hidden={isContinuation}
      />
      <S.MessagePart $isMyMessage={isMyMessage}>
        {!isContinuation && <S.Nickname>{message.nickname}</S.Nickname>}
        <S.Message $isMyMessage={isMyMessage}>
          {message.messageContent}
        </S.Message>
      </S.MessagePart>
    </S.Container>
  );
};

export default ChatBox;
