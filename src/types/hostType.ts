export interface AIResponse {
  product_name: string;
  title: string;
  total_price: number;
  count: number;
  summary: string;
}

export interface HostAccount {
  accountBank: string;
  accountNumber: string;
}

export interface OrderPartiData {
  orderId: number;
  nickname: string;
  name: string;
  accountName: string;
  accountNumber: string;
  price: number;
  quantity: number;
  status: string;
}
