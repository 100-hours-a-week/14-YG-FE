import { GroupBuyItem } from "../../../types/productType";
import ProductCard from "../productCard/ProductCard";
import * as S from "./CardList.styled";

interface CardListProps {
  list: GroupBuyItem[];
}

const CardList = ({ list }: CardListProps) => {
  return (
    <S.ListContainer>
      {list.map((item) => (
        <ProductCard key={item.postId} item={item} />
      ))}
    </S.ListContainer>
  );
};

export default CardList;
