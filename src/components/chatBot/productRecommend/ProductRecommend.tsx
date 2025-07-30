import { ProductRecommendProps } from "../../../types/chatBotType";
import * as S from "./ProductRecommend.styled";

type Props = {
  seq: number;
  option: ProductRecommendProps;
};

const ProductRecommend = ({ seq, option }: Props) => {
  return (
    <S.Container onClick={() => window.open(option.url, "_blank")}>
      <S.Top>
        <S.Seq>{seq}</S.Seq>
        <S.Name>{option.title}</S.Name>
      </S.Top>
      <S.Price>{option.price}</S.Price>
    </S.Container>
  );
};

export default ProductRecommend;
