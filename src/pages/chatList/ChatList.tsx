import { useEffect } from "react";
import ChatCard from "../../components/chatList/chatCard/ChatCard";
import EmptySection from "../../components/common/emptySection/EmptySection";
import Loading from "../../components/common/loading/Loding";
import { useInfiniteChatList } from "../../hooks/queries/useChatQuery";
import * as S from "./ChatList.styled";
import { useInView } from "react-intersection-observer";

const ChatList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteChatList();

  const allChatRooms = data?.pages.flatMap((page) => page.chatRooms) ?? [];

  const { ref, inView } = useInView({ threshold: 0.3 });

  // 무한스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Loading message="채팅 리스트를 불러오는 중입니다." />;

  return (
    <S.Container>
      {allChatRooms.length > 0 ? (
        <>
          {allChatRooms.map((item) => (
            <ChatCard key={item.chatRoomId} item={item} />
          ))}
          {hasNextPage && (
            <div
              ref={ref}
              style={{ height: "50px", background: "transparent" }}
            />
          )}
          {isFetchingNextPage && <Loading />}
        </>
      ) : (
        <EmptySection category="참여한" />
      )}
    </S.Container>
  );
};

export default ChatList;
