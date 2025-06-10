import ImageContainer from "../../common/image/imageContainer/ImageContainer";
import * as S from "./ChatCard.styled";
import 참치1 from "../../../assets/images/참치1.png";
import {
  CardInfo,
  CommonSection,
  PickupPlace,
} from "../../mypage/myListCard/MyListCard.styled";
import CurrentParti from "../../common/currentParti/CurrentParti";
import { SectionLine } from "../../common/SectionLine.styled";
import { useNavigate } from "react-router-dom";

const ChatCard = () => {
  const navigate = useNavigate();

  return (
    <>
      <CommonSection onClick={() => navigate("/chat/id")}>
        <ImageContainer postId={1} imageUrl={참치1} />
        <CardInfo>
          <S.Title>5명만 모집합니당</S.Title>
          <PickupPlace>카테부</PickupPlace>
          <S.Chat>
            <S.Message>누구세요?</S.Message>
            <S.ChatCount>50</S.ChatCount>
          </S.Chat>
          <CurrentParti soldAmount={45} totalAmount={50} participantCount={5} />
        </CardInfo>
      </CommonSection>
      <SectionLine />
    </>
  );
};

export default ChatCard;
