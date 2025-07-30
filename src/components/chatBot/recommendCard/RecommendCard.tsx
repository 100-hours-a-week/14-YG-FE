import ProgressBar from "../../common/progressBar/ProgressBar";
import * as S from "./RecommendCard.styled";
import 토마토 from "../../../assets/images/Tomato.png";
import { RecommendCardProps } from "../../../types/chatBotType";

const RecommendCard = ({ item }: { item: RecommendCardProps }) => {
  return (
    <S.Container>
      <S.FixedButton>진행중</S.FixedButton>
      <S.Image src={토마토} />
      <S.Info>
        <S.Title>{item.title}</S.Title>
        <S.Name>{item.product_name}</S.Name>
        <S.Price>
          개당 <span>{item.unit_price}원</span>
        </S.Price>
        <ProgressBar
          current={item.total_amount - item.left_amount}
          total={item.total_amount}
        />
        <S.OrderInfo>
          <S.Component>
            주문 단위 <span>{item.unit_amount}개</span>
          </S.Component>
          <S.Component>
            잔여 수량 <span>{item.left_amount}개</span>
          </S.Component>
        </S.OrderInfo>
        <S.DateInfo>
          <S.DateComponent>
            📅마감일 <span>5월 30일</span>
          </S.DateComponent>
          <S.DateComponent>
            📦픽업일 <span>6월 2일</span>
          </S.DateComponent>
        </S.DateInfo>
      </S.Info>
    </S.Container>
  );
};

export default RecommendCard;
