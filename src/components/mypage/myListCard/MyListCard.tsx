import * as S from "./MyListCard.styled";
import ShoppingBag from "../../../assets/icons/ShoppingBag.svg";
import { getImageUrl } from "../../../utils/image";
import { useNavigate } from "react-router-dom";
import { ListPostProps } from "../../../types/userType";
import CurrentParti from "../../common/currentParti/CurrentParti";
import { SectionLine } from "../../common/SectionLine.styled";
import ImageContainer from "../../common/image/imageContainer/ImageContainer";

interface MyListCardItem {
  item: ListPostProps;
  renderActions?: (item: ListPostProps) => React.ReactNode;
}

const MyListCard = ({ item, renderActions }: MyListCardItem) => {
  const navigate = useNavigate();
  const actionContent = renderActions?.(item);

  return (
    <>
      <S.CardContainer>
        <S.CommonSection
          onClick={() => {
            navigate(`/products/${item.postId}`);
          }}
        >
          <ImageContainer
            imageUrl={getImageUrl(item.imageKey)}
            postId={item.postId}
          />
          <S.CardInfo>
            {item.orderStatus && (
              <S.OrderState>
                {item.orderStatus === "CONFIRMED"
                  ? "입금 확인 완료"
                  : "입금 확인 중"}
              </S.OrderState>
            )}
            <S.ProductInfo>
              <S.PickupPlace>{item.location}</S.PickupPlace>
              <S.UnitPrice>
                {item.orderPrice
                  ? `${item.orderPrice.toLocaleString()}원`
                  : `${item.unitPrice?.toLocaleString()}원`}
              </S.UnitPrice>
              <S.PostTitle>{item.title}</S.PostTitle>
            </S.ProductInfo>
            <S.OrderInfo>
              <S.MyOrder>
                <img src={ShoppingBag} alt="쇼핑백" /> 구매수량 :
                {item.orderQuantity ? item.orderQuantity : item.hostQuantity}
              </S.MyOrder>
              <CurrentParti
                soldAmount={item.soldAmount}
                totalAmount={item.totalAmount}
                participantCount={item.participantCount}
              />
            </S.OrderInfo>
          </S.CardInfo>
        </S.CommonSection>
        {actionContent && <S.ButtonSection>{actionContent}</S.ButtonSection>}
      </S.CardContainer>
      <SectionLine />
    </>
  );
};

export default MyListCard;
