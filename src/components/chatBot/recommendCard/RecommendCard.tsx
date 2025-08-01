import ProgressBar from "../../common/progressBar/ProgressBar";
import * as S from "./RecommendCard.styled";
import { RecommendCardProps } from "../../../types/chatBotType";
import { getImageUrl } from "./../../../utils/image";
import { decodeHtmlEntities } from "./../../../utils/decodeHtmlEntities";
import { formatDateToMonthDay } from "../../../utils/date";
import { useNavigate } from "react-router-dom";

const RecommendCard = ({ item }: { item: RecommendCardProps }) => {
  const navigate = useNavigate();
  return (
    <S.Container onClick={() => navigate(`/products/${item.id}`)}>
      <S.FixedButton>진행중</S.FixedButton>
      <S.Image src={getImageUrl(item.thumbnail_url)} />
      <S.Info>
        <S.Title>{decodeHtmlEntities(item.title)}</S.Title>
        <S.Name>{decodeHtmlEntities(item.product_name)}</S.Name>
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
            📅마감일 <span>{formatDateToMonthDay(item.due_date)}</span>
          </S.DateComponent>
          <S.DateComponent>
            📦픽업일 <span>{formatDateToMonthDay(item.pickup_date)}</span>
          </S.DateComponent>
        </S.DateInfo>
      </S.Info>
    </S.Container>
  );
};

export default RecommendCard;
