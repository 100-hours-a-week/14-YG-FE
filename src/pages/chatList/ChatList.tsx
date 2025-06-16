import ChatCard from "../../components/chatList/chatCard/ChatCard";
import EmptySection from "../../components/common/emptySection/EmptySection";
import Loading from "../../components/common/loading/Loding";
import { useChatListQuery } from "../../hooks/queries/useChatQuery";
import * as S from "./ChatList.styled";

const ChatList = () => {
  const { data: chatList, isLoading } = useChatListQuery();
  console.log(chatList);

  if (isLoading) return <Loading message="채팅 리스트를 불러오는 중입니다." />;

  return (
    <S.Container>
      {chatList ? (
        chatList.chatRooms.map((item) => (
          <ChatCard key={item.chatRoomId} item={item} />
        ))
      ) : (
        <EmptySection category="참여한" />
      )}
    </S.Container>
  );
};

export default ChatList;
