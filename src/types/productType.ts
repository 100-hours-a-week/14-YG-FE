import { UserInfo } from "./userType";

export interface GetGroupBuysParams {
  orderBy?: "latest" | "price_asc" | "ending_soon" | "due_soon_only";
  category?: number;
  cursorId?: number;
  cursorPrice?: number;
  cursorCreatedAt?: string;
  limit?: number;
  keyword?: string;
  openOnly?: boolean;
}

export interface GroupBuyImage {
  imageKey: string;
  isThumbnail: boolean;
  orderIndex: number;
}

export interface GroupBuyList {
  count: number;
  posts: GroupBuyItem[];
  nextCursor: number;
  nextCreatedAt: string;
  nextCursorPrice: number;
  hasMore: boolean;
}

export interface GroupBuyItem {
  postId: number;
  title: string;
  name: string;
  imageKeys: GroupBuyImage[];
  unitPrice: number;
  unitAmount: number;
  soldAmount: number;
  totalAmount: number;
  participantCount: number;
  dueSoon: boolean;
  isWish: boolean;
  createdAt: string;
}

export interface PostRequestData {
  title: string;
  name: string;
  price: number;
  totalAmount: number;
  unitAmount: number;
  hostQuantity: number;
  description: string;
  dueDate: string;
  location: string;
  pickupDate: string;
  imageKeys: string[];
  url?: string;
}

export interface PostProps {
  postId: number;
  title: string;
  name: string;
  postStatus: string;
  description: string;
  url: string;
  imageKeys: GroupBuyImage[];
  location: string;
  pickupDate: string;
  unitPrice: number;
  unitAmount: number;
  soldAmount: number;
  totalAmount: number;
  leftAmount: number;
  isParticipant: boolean;
  participantCount: number;
  dueDate: string;
  dueSoon: boolean;
  isWish: boolean;
  createdAt: string;
  userProfileResponse: UserInfo;
}

export interface EditPostRequest {
  postId: number;
  title: string;
  name: string;
  description: string;
  hostQuantity: number;
  dueDate: string;
  pickupDate?: string;
  dateModificationReason?: string;
  imageKeys: string[];
}

export interface EditPostData {
  title: string;
  name: string;
  description: string;
  imageKeys: GroupBuyImage[];
  dueDate: string;
  location: string;
  pickupDate: string;
  price: number;
  unitAmount: number;
  totalAmount: number;
  leftAmount: number;
  hostQuantity: number;
}
