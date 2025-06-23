export interface ChatListResponse {
  chatRooms: ChatRooms[];
  nextCursorJoinedAt: string;
  hasMore: boolean;
}

export interface ChatRooms {
  chatRoomId: string;
  imagekey: string;
  lastMessageContent: string;
  lastMessageId: number;
  location: string;
  participantCount: number;
  soldAmount: number;
  title: string;
  totalAmount: number;
}

export interface PrevChatList {
  chatMessageResponses: ChatMessage[];
  nextCursorId: string;
  nextCreatedAt?: string;
  hasNext: boolean;
}

export interface ChatMessage {
  messageId: string;
  participantId: number;
  nickname: string;
  profileImageKey?: string;
  messageContent: string;
  createdAt: string;
}
