import { useEffect, useMemo, useRef, useState } from "react";
import FilterSelector from "../../components/common/filteringSelector/FilteringSelector";
import * as S from "./PostList.styled";
import { SectionLine } from "../../components/common/SectionLine.styled";
import CardList from "../../components/postList/cardList/CardList";
import SearchBar from "../../components/common/searchBar/SearchBar";
import Loading from "../../components/common/loading/Loding";
import EmptySection from "../../components/common/emptySection/EmptySection";
import { useLocation, useParams } from "react-router-dom";
import SadIcon from "../../assets/icons/Sad.svg?react";
import { useInfiniteGroupBuys } from "../../hooks/queries/useInfiniteQuery";

const filterOptions = ["최신순", "가격 낮은 순", "마감 임박 순"] as const;
type StatusKey = (typeof filterOptions)[number];

const statusMap: Record<StatusKey, "latest" | "price_asc" | "ending_soon"> = {
  최신순: "latest",
  "가격 낮은 순": "price_asc",
  "마감 임박 순": "ending_soon",
};

const categoryMap: Record<string, number> = {
  moongsanPick: 1,
  food: 2,
  life: 3,
};

const PostList = () => {
  const [status, setStatus] = useState<StatusKey>("최신순");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { category } = useParams();
  const categoryId = category ? categoryMap[category] : undefined;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("search");
  const title = category === "moongsanPick" ? "뭉산PICK" : "전체";

  const handleToggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  const params = useMemo(
    () => ({
      orderBy: statusMap[status],
      ...(categoryId ? { category: categoryId } : {}),
      ...(isChecked ? { openOnly: true } : {}),
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
    }),
    [status, categoryId, isChecked, searchKeyword]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGroupBuys(params);

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("👀 Entry:", entry.isIntersecting);
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <S.Container>
      <SearchBar />
      <S.FilteringContainer>
        <FilterSelector
          options={filterOptions.slice()}
          selected={status}
          onSelect={setStatus}
        />
        <S.SelectBox onClick={handleToggleCheck}>
          {isChecked ? <S.StyledCheckBox /> : <S.StyledNonCheckBox />}
          공구중
        </S.SelectBox>
      </S.FilteringContainer>
      <S.Count>{data?.pages[0].count}개의 결과</S.Count>
      <SectionLine />
      {isLoading ? (
        <Loading />
      ) : allPosts.length !== 0 ? (
        <S.ScrollWrapper>
          <CardList list={allPosts} />
          {hasNextPage && (
            <div
              ref={observerRef}
              style={{
                height: "10px", // 👈 중요: 감지용 영역 충분히 줘야 함
                marginTop: "40px",
                background: "transparent",
              }}
            />
          )}
          {isFetchingNextPage && <Loading />}
        </S.ScrollWrapper>
      ) : searchParams.get("search") ? (
        <S.EmptySearch>
          <SadIcon />
          <S.Ment>검색결과가 없습니다</S.Ment>
        </S.EmptySearch>
      ) : (
        <EmptySection category={title} />
      )}
    </S.Container>
  );
};

export default PostList;
