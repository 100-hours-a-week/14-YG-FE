export interface OrderRequestData {
  postId: number;
  price: number;
  quantity: number;
  name?: string;
}

export interface OrderResponse {
  productName: string;
  quantity: number;
  price: number;
  hostName: string;
  hostAccountBank: string;
  hostAccountNumber: string;
}
