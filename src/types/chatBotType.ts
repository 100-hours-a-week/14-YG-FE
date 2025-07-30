export interface ChatBotResponse {
  type: "processing" | "ai_response" | "completion";
  content: string;
  agent?: string;
  timestamp: string;
  session_id: string;
}

export interface SendMessageParams {
  message: string;
  sessionId?: string;
  nickname: string;
}
