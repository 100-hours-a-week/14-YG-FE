import { useNavigate, useParams } from "react-router-dom";
import { useSendMessageMutation } from "../../hooks/mutations/chat/useSendMessageMutation";
import * as S from "./ChatRoom.styled";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import ChatBox from "../../components/chat/ChatBox";
import { ChatMessage } from "../../types/chatType";
import { useCurrentMessagePolling } from "../../hooks/useCurrentMessagePolling";
import { useInfinitePastChat } from "../../hooks/queries/useChatQuery";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "@tanstack/react-query";

const ChatRoom = () => {
  const queryClient = useQueryClient();
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const user = useUserStore((s) => s.user);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isInitialScroll = useRef(true);
  const fetchLockRef = useRef(false); // ✅ 중복 호출 방지용

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

  // ✅ 무한스크롤 트리거 (중복 방지)
  useEffect(() => {
    if (isTopInView && hasNextPage && !fetchLockRef.current) {
      fetchLockRef.current = true;
      fetchNextPage().finally(() => {
        fetchLockRef.current = false;
      });
    }
  }, [isTopInView, hasNextPage, fetchNextPage]);

  // 실시간 메시지 추가
  useCurrentMessagePolling(Number(chatRoomId), (newMessages) => {
    setMessages((prev) => [...prev, ...newMessages]);
  });

  // 메시지 병합
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
    }
  }, [data]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
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

  if (!user) {
    alert("다시 로그인해주세요!");
    navigate("/");
    return null;
  }

  return (
    <S.Container>
      <S.ChatPart>
        <div ref={topRef} style={{ height: 1 }} />
        {messages.map((message, idx) => {
          const prev = messages[idx - 1];
          const isContinuation = prev?.participantId === message.participantId;

          return (
            <ChatBox
              key={message.messageId}
              message={message}
              isContinuation={isContinuation}
              isMyMessage={user.nickname === message.nickname}
            />
          );
        })}
        <div ref={bottomRef} />
      </S.ChatPart>

      <S.MessagePart>
        <S.MessageBox
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (message.trim()) {
                sendMessage({ content: message });
                setMessage("");
              }
            }
          }}
          placeholder={`${user.nickname}(으)로 대화해보세요.`}
        />
        <S.StyledSendButton
          onClick={() => {
            if (message.trim()) {
              sendMessage({ content: message });
              setMessage("");
            }
          }}
        />
      </S.MessagePart>
    </S.Container>
  );
};

export default ChatRoom;
