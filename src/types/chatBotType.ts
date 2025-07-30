export interface ChatBotResponse {
  type:
    | "processing"
    | "ai_response"
    | "completion"
    | "user_message"
    | "bot_message";
  content: string;
  agent?: string;
  timestamp: string;
  session_id?: string;
}

export interface SendMessageParams {
  message: string;
  sessionId?: string;
  nickname: string;
}

export interface ProductRecommendProps {
  id: number;
  title: string;
  price: string;
  url: string;
}

export interface RecommendCardProps {
  id: string;
  thumbnail_url: string;
  title: string;
  product_name: string;
  unit_price: number;
  total_amount: number;
  left_amount: number;
  unit_amount: number;
  due_date: string;
  pickup_date: string;
}
