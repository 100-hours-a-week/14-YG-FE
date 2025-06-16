import ImageContainer from "../../common/image/imageContainer/ImageContainer";
import * as S from "./ChatCard.styled";
import {
  CardInfo,
  PickupPlace,
} from "../../mypage/myListCard/MyListCard.styled";
import CurrentParti from "../../common/currentParti/CurrentParti";
import { SectionLine } from "../../common/SectionLine.styled";
import { useNavigate } from "react-router-dom";
import { ChatRooms } from "../../../types/chatType";
import { getImageUrl } from "../../../utils/image";

interface ChatCardProps {
  item: ChatRooms;
}

const ChatCard = ({ item }: ChatCardProps) => {
  const navigate = useNavigate();

  return (
    <>
      <S.CommonSection onClick={() => navigate(`/chat/${item.chatRoomId}`)}>
        <ImageContainer imageUrl={getImageUrl(item.imagekey)} />
        <CardInfo>
          <S.Title>{item.title}</S.Title>
          <PickupPlace>{item.location}</PickupPlace>
          <S.Chat>
            <S.Message>{item?.lastMessageContent}</S.Message>
            {/*<S.ChatCount>50</S.ChatCount>*/}
          </S.Chat>
          <CurrentParti
            soldAmount={item.soldAmount}
            totalAmount={item.totalAmount}
            participantCount={item.participantCount}
          />
        </CardInfo>
      </S.CommonSection>
      <SectionLine />
    </>
  );
};

export default ChatCard;
