export interface NotificationPayload {
  occurredAt: string;
  orderId?: number;
  groupBuyId?: number;
  hostId?: number;
  groupBuyTitle?: string;
  quantity?: number;
  participantCount?: number;
  totalQty?: number | null;
  buyerName?: string;
  buyerBank?: string;
  buyerAccount?: string;
  price?: number;
}

export type NotificationType =
  | "ORDER_PENDING"
  | "ORDER_CONFIRMED"
  | "ORDER_CANCELED"
  | "ORDER_REFUNDED"
  | "GROUPBUY_STATUS_CLOSED"
  | "GROUPBUY_STATUS_FINALIZED"
  | "GROUPBUY_STATUS_ENDED";

export interface Notification {
  id: number;
  title: string;
  body: string;
  type: NotificationType;
  payload: NotificationPayload;
  createdAt: string;
  read: boolean;
}
