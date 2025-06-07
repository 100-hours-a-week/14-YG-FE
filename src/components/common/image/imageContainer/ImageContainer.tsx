import { GetMyListParams } from "../../../../types/userType";
import LikeToggle from "../../likeToggle/LikeToggle";
import * as S from "./ImageContainer.styled";

interface ImageContainerProps {
  imageUrl: string;
  postId: number;
  params?: GetMyListParams;
}

const ImageContainer = ({ imageUrl, postId, params }: ImageContainerProps) => {
  return (
    <S.ImageContainer>
      <S.CardImage src={imageUrl} alt="상품 이미지" />
      <LikeToggle postId={postId} params={params} />
    </S.ImageContainer>
  );
};

export default ImageContainer;
