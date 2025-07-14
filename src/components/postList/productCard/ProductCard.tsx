import ImageSlider from "../../common/image/imageSlider/ImageSlider";
import * as S from "./ProductCard.styled";
import CurrentParti from "../../common/currentParti/CurrentParti";
import { SectionLine } from "../../common/SectionLine.styled";
import { GroupBuyItem } from "../../../types/productType";
import { formatDateTime } from "../../../utils/date";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  item: GroupBuyItem;
}

const ProductCard = ({ item }: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <>
      <S.Container
        onClick={() => {
          navigate(`/products/${item.postId}`);
        }}
      >
        <S.Title>{item.title}</S.Title>
        <S.Date>게시글 업로드 날짜 {formatDateTime(item.createdAt)}</S.Date>
        <ImageSlider
          postId={item.postId}
          images={item.imageKeys?.map((img) => img.imageKey)}
        />
        <S.ProductName>{item.name}</S.ProductName>
        <S.Info>
          <S.PriceInfo>
            {item.unitPrice.toLocaleString()}원{" "}
            <span>(주문단위 : {item.unitAmount})</span>
          </S.PriceInfo>
          <CurrentParti
            soldAmount={item.soldAmount}
            totalAmount={item.totalAmount}
            participantCount={item.participantCount}
          />
        </S.Info>
      </S.Container>
      <SectionLine />
    </>
  );
};

export default ProductCard;
