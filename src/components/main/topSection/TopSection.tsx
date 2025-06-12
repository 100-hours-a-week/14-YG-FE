import * as S from "./TopSection.styled";
import { getImageUrl } from "./../../../utils/image";
import { useNavigate } from "react-router-dom";
import { useGroupBuysList } from "../../../hooks/queries/useProductQuery";
import Loading from "../../common/loading/Loding";

const TopSection = () => {
  const navigate = useNavigate();
  const {
    data: groupBuys,
    isLoading,
    isError,
  } = useGroupBuysList({
    orderBy: "ending_soon",
    limit: 5,
  });

  if (isLoading) return <Loading />;
  if (isError || !groupBuys) return <div>에러 발생</div>;

  return (
    <S.SectionContainer>
      <S.SectionName>마감 임박!!</S.SectionName>
      <S.ImagePart>
        <S.BigImage
          src={getImageUrl(groupBuys.posts[0]?.imageKeys[0]?.imageKey)}
          onClick={() => {
            navigate(`/products/${groupBuys.posts[0]?.postId}`);
          }}
        />
        <S.SmallImagePart>
          {groupBuys.posts.slice(1).map((item) => (
            <S.ImageContainer
              key={item.postId}
              src={getImageUrl(item?.imageKeys[0]?.imageKey)}
              onClick={() => {
                navigate(`/products/${item.postId}`);
              }}
            />
          ))}
        </S.SmallImagePart>
      </S.ImagePart>
    </S.SectionContainer>
  );
};

export default TopSection;
