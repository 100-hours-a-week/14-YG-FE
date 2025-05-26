import { UserInfo } from "./userType";

export interface GetGroupBuysParams {
  orderBy?: "latest" | "price_asc" | "ending_soon" | "due_soon_only";
  postStatus?: "open" | "closed" | "ended";
  category?: number;
  cursorId?: number;
  cursorPrice?: number;
  cursorCreatedAt?: string;
  limit?: number;
}

export interface GroupBuyImage {
  imageKey: string;
  isThumbnail: boolean;
  orderIndex: number;
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
