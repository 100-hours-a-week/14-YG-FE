import { useMemo, useState } from "react";
import * as S from "./MyList.styled";
import MyListCard from "../myListCard/MyListCard";
import FilterSelector from "../../common/filteringSelector/FilteringSelector";
import EmptySection from "../../common/emptySection/EmptySection";
import { useModalStore } from "../../../stores/useModalStore";
import {
  useHostList,
  useLikedList,
  useOrderList,
} from "../../../hooks/queries/useMyList";
import { useNavigate } from "react-router-dom";

const statusMap = {
  공구중: "open",
  모집마감: "closed",
  공구종료: "ended",
} as const;

type StatusKey = keyof typeof statusMap;

interface MyListProps {
  activeTab: "참여목록" | "주최목록" | "관심목록";
}

const MyList = ({ activeTab }: MyListProps) => {
  const [status, setStatus] = useState<StatusKey>("공구중");
  const openModal = useModalStore((s) => s.openModal);
  const navigate = useNavigate();

  // ✅ 이거 useMemo로 고정!
  const commonParams = useMemo(() => ({ sort: statusMap[status] }), [status]);

  // ✅ Hook은 조건 없이 항상 호출
  const orderQuery = useOrderList(commonParams);
  const hostQuery = useHostList(commonParams);
  const likedQuery = useLikedList(commonParams);

  // ✅ 조건에 따라 데이터를 선택
  const items =
    activeTab === "참여목록"
      ? orderQuery.data
      : activeTab === "주최목록"
        ? hostQuery.data
        : likedQuery.data;
  console.log(items);

  return (
    <S.Container>
      <S.FilteringSection>
        <FilterSelector
          options={["공구중", "모집마감", "공구종료"]}
          selected={status}
          onSelect={setStatus}
        />
      </S.FilteringSection>
      {!items || items.length === 0 ? (
        <EmptySection
          category={
            activeTab === "참여목록"
              ? "참여한"
              : activeTab === "주최목록"
                ? "주최한"
                : "관심있는"
          }
        />
      ) : (
        items.map((item) => (
          <MyListCard
            key={item.postId}
            params={commonParams}
            item={item}
            renderActions={() => {
              if (activeTab === "참여목록") {
                return (
                  <>
                    <S.TopButton>
                      <S.WhiteButton>주문 상세</S.WhiteButton>
                      <S.WhiteButton>채팅방 이동</S.WhiteButton>
                    </S.TopButton>
                  </>
                );
              }
              if (activeTab === "주최목록" && status !== "공구종료") {
                return (
                  <>
                    <S.TopButton>
                      <S.WhiteButton onClick={() => openModal("host")}>
                        참여자 확인하기
                      </S.WhiteButton>
                      <S.WhiteButton
                        onClick={() => navigate(`/editPost/${item.postId}`)}
                      >
                        공구글 수정
                      </S.WhiteButton>
                    </S.TopButton>
                    <S.EndButton>공구 종료</S.EndButton>
                  </>
                );
              }
              return null;
            }}
          />
        ))
      )}
    </S.Container>
  );
};

export default MyList;
