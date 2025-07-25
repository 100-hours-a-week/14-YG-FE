import ProgressBar from "../../common/progressBar/ProgressBar";
import * as S from "./RecommendCard.styled";
import 토마토 from "../../../assets/images/Tomato.png";

const RecommendCard = () => {
  return (
    <S.Container>
      <S.FixedButton>진행중</S.FixedButton>
      <S.Image src={토마토} />
      <S.Info>
        <S.Title>제목제목</S.Title>
        <S.Name>이름이름</S.Name>
        <S.Price>
          개당 <span>523원</span>
        </S.Price>
        <ProgressBar current={12} total={20} />
        <S.OrderInfo>
          <S.Component>
            주문 단위 <span>1개</span>
          </S.Component>
          <S.Component>
            잔여 수량 <span>16개</span>
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
