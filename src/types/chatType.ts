export interface ChatListResponse {
  chatRooms: ChatRooms[];
  nextCursorJoinedAt: string;
  hasMore: boolean;
}

export interface ChatListParams {
  cursorJoinedAt?: string;
  limit?: number;
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

export interface PrevChatParams {
  cursorMessageIdAfter?: string;
  cursorMessageIdBefore?: string;
}

export interface PrevChatList {
  chatMessageResponses: ChatMessage[];
  beforeCursorId?: string;
  beforeCreatedAt?: string;
  hasBefore: boolean;
}

export interface ChatMessage {
  messageId: string;
  participantId: number;
  nickname: string;
  profileImageKey?: string;
  messageContent: string;
  createdAt: string;
}

export interface AnonymousChat {
  id: string;
  postId: number;
  aliasId: number;
  message: string;
  createdAt: string;
}
