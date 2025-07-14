import { useNavigate, useParams } from "react-router-dom";
import { useSendMessageMutation } from "../../hooks/mutations/chat/useSendMessageMutation";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { ChatMessage } from "../../types/chatType";
import { useCurrentMessagePolling } from "../../hooks/useCurrentMessagePolling";
import { useInfinitePastChat } from "../../hooks/queries/useChatQuery";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "@tanstack/react-query";
import ChatRoomUI from "../../components/chat/chatRoomUI/ChatRoomUI";

const ChatRoom = () => {
  const queryClient = useQueryClient();
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const messageRef = useRef("");
  const user = useUserStore((s) => s.user);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isInitialScroll = useRef(true);
  const fetchLockRef = useRef(false); // ✅ 중복 호출 방지용
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const shouldScrollToBottomRef = useRef(false);
  const isSendingRef = useRef(false);

  // 항상 ref 최신화
  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  useEffect(() => {
    if (chatRoomId) {
      queryClient.removeQueries({
        queryKey: ["prevChatInfinite", Number(chatRoomId)],
      });
    }
  }, [chatRoomId, queryClient]);

  const { mutate: sendMessage } = useSendMessageMutation(Number(chatRoomId));

  const { data, fetchNextPage, hasNextPage } = useInfinitePastChat(
    Number(chatRoomId)
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesRef = useRef<ChatMessage[]>([]);

  // ⬆️ 상단 감지용
  const { ref: topRef, inView: isTopInView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (isTopInView && hasNextPage && !fetchLockRef.current) {
      fetchLockRef.current = true;

      // ✅ 과거 채팅 fetch 전 scrollHeight 저장
      const container = chatContainerRef.current;
      prevScrollHeightRef.current = container?.scrollHeight || 0;
    }

    fetchNextPage().finally(() => {
      fetchLockRef.current = false;
      // 복원은 setMessages 이후 setTimeout에서 처리하므로 여기선 제거
    });
  }, [isTopInView, hasNextPage, fetchNextPage]);

  // 실시간 메시지 추가
  useCurrentMessagePolling(Number(chatRoomId), (newMessages) => {
    if (newMessages.length > 0) {
      shouldScrollToBottomRef.current = true;
      setMessages((prev) => [...prev, ...newMessages]);
    }
  });

  useEffect(() => {
    if (data) {
      const pastMessages = data.pages.flatMap(
        (page) => page.chatMessageResponses
      );
      const allMessages = [...pastMessages, ...messages];
      const uniqueMessagesMap = new Map<string, ChatMessage>();
      for (const msg of allMessages) {
        uniqueMessagesMap.set(msg.messageId, msg);
      }
      const dedupedMessages = Array.from(uniqueMessagesMap.values());

      dedupedMessages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setMessages(dedupedMessages);
      messagesRef.current = dedupedMessages;

      // ✅ 병합이 끝난 이후 DOM이 업데이트되었을 시점에 복원해야 함
      // 따라서 setTimeout으로 다음 이벤트 루프로 밀어줌
      setTimeout(() => {
        const container = chatContainerRef.current;
        if (container && prevScrollHeightRef.current !== 0) {
          const newScrollHeight = container.scrollHeight;
          const diff = newScrollHeight - prevScrollHeightRef.current;
          container.scrollTop += diff;
          prevScrollHeightRef.current = 0; // 한 번 복원한 후엔 초기화
        }
      }, 0);
    }
  }, [data]);

  useEffect(() => {
    if (shouldScrollToBottomRef.current && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      shouldScrollToBottomRef.current = false;
    }
  }, [messages]);

  // 첫 진입 시 맨 아래로
  useEffect(() => {
    if (isInitialScroll.current && bottomRef.current) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
        isInitialScroll.current = false;
      }, 0);
    }
  }, [data]);

  const handleSend = () => {
    const trimmed = messageRef.current.trim();
    if (!trimmed || isSendingRef.current) return;

    isSendingRef.current = true;
    sendMessage(
      { content: trimmed },
      {
        onSuccess: () => {
          setMessage("");
        },
        onSettled: () => {
          isSendingRef.current = false;
        },
      }
    );
  };

  if (!user) {
    alert("다시 로그인해주세요!");
    navigate("/");
    return null;
  }

  return (
    <ChatRoomUI
      userNickname={user.nickname}
      messages={messages}
      message={message}
      setMessage={setMessage}
      onSend={handleSend}
      bottomRef={bottomRef}
      chatContainerRef={chatContainerRef}
      topRef={topRef}
    />
  );
};

export default ChatRoom;
