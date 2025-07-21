export interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
  nickname: string;
  accountBank: string;
  accountNumber: string;
  profileImageUrl: string;
}

export interface GetMyListParams {
  sort?: "open" | "closed" | "ended";
  cursor?: number;
  limit?: number;
}

export interface MyListProps {
  posts: ListPostProps[];
  nextCursor: number;
  hasMore: boolean;
}

export interface ListPostProps {
  postId: number;
  chatRoomId?: number;
  title: string;
  postStatus: string;
  location: string;
  imageKey: string;
  unitPrice?: number;
  orderPrice?: number;
  orderQuantity?: number;
  hostQuantity?: number;
  soldAmount: number;
  totalAmount: number;
  participantCount: number;
  orderStatus?: string;
  dueSoon: boolean;
  isWish: boolean;
}

export interface ConfirmAccountParams {
  name?: string;
  accountBank?: string;
  accountNumber?: string;
}

export interface EditProfileRequest {
  nickname?: string;
  phoneNumber?: string;
}
