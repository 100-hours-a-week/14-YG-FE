import MainCard from "../mainCard/MainCard";
import * as S from "./SubSection.styled";
import { useNavigate } from "react-router-dom";
import { useGroupBuysList } from "../../../hooks/queries/useProductQuery";
import EmptySection from "../../common/emptySection/EmptySection";

interface SubSectionProps {
  title: string;
  orderBy: "latest" | "price_asc" | "ending_soon" | "due_soon_only";
  category?: string;
  categoryId?: number;
}

const SubSection = ({
  title,
  orderBy,
  category,
  categoryId,
}: SubSectionProps) => {
  const { data: groupBuys, isError } = useGroupBuysList({
    orderBy: orderBy,
    category: categoryId,
  });
  const navigate = useNavigate();

  return (
    <S.RowScrollSection>
      {title === "마감임박" ? (
        <S.SectionName>{title}</S.SectionName>
      ) : (
        <S.SectionHead
          onClick={() => {
            navigate(category ? `/products/category/${category}` : "/products");
          }}
        >
          <S.SectionName>{title}</S.SectionName>
          <S.StyledArrow />
        </S.SectionHead>
      )}

      {isError || !groupBuys?.posts || groupBuys.posts.length === 0 ? (
        <EmptySection category={title} />
      ) : (
        <S.RowScrollContainer>
          {groupBuys.posts.map((item) => (
            <MainCard
              onClick={() => {
                navigate(`/products/${item.postId}`);
              }}
              key={item.postId}
              imageKey={item.imageKeys[0]?.imageKey}
              title={item.title}
              unitPrice={item.unitPrice.toLocaleString()}
              unitAmount={item.unitAmount}
              postId={item.postId}
            />
          ))}
        </S.RowScrollContainer>
      )}
    </S.RowScrollSection>
  );
};

export default SubSection;
