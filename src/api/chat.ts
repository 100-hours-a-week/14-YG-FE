import { AxiosError } from "axios";
import api from "./instance";
import { ChatListParams, PrevChatParams } from "../types/chatType";

/**
 * 익명채팅방 참가
 * @returns
 */

export const enterAnonyChat = async () => {
  try {
    const res = await api.post("/api/chat/anon");

    if (res.data.data) {
      return res.data.data;
    } else {
      throw new Error("응답에 data가 없습니다");
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("채팅방 참여 중 알 수 없는 오류가 발생했습니다.");
  }
};

/**
 * 채팅방 리스트 조회
 * @returns
 */

export const getChatList = async (params?: ChatListParams) => {
  try {
    const res = await api.get("/api/chats/users/me/participant", { params });

    if (res.data.data) {
      return res.data.data;
    } else {
      throw new Error("응답에 data가 없습니다");
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("채팅방 참여 중 알 수 없는 오류가 발생했습니다.");
  }
};

/**
 * 채팅 메세지 작성
 * @param data
 * @returns
 */

export const postMessage = async (chatRoomId: number, content: string) => {
  try {
    const res = await api.post(
      `/api/chats/participant/${chatRoomId}/messages`,
      { messageContent: content }
    );

    if (res.data) {
      return res.data;
    } else {
      throw new Error("응답에 data가 없습니다");
    }
  } catch (error) {
    console.log(error);
    // AxiosError 자체를 throw해야 useMutation에서 status 분기가 가능
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("채팅방 참여 중 알 수 없는 오류가 발생했습니다.");
  }
};

/**
 * 과거 메세지 조회
 * @param data
 * @returns
 */

export const getPrevMessage = async (
  chatRoomId: number,
  params?: PrevChatParams
) => {
  try {
    const res = await api.get(
      `/api/chats/participant/${chatRoomId}/message/past`,
      { params }
    );

    if (res.data) {
      return res.data.data;
    } else {
      throw new Error("응답에 data가 없습니다");
    }
  } catch (error) {
    console.log(error);
    // AxiosError 자체를 throw해야 useMutation에서 status 분기가 가능
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("채팅방 참여 중 알 수 없는 오류가 발생했습니다.");
  }
};

/**
 * 실시간 메세지 조회(롱폴링)
 * @param data
 * @returns
 */
export const getCurrentMessage = async (
  chatRoomId: number,
  lastMessageId?: string
) => {
  try {
    const res = await api.get(
      `/api/chats/participant/${chatRoomId}/polling/latest`,
      {
        params: { lastMessageId },
      }
    );

    if (res.data.data) {
      return res.data.data;
    } else {
      throw new Error("응답에 data가 없습니다");
    }
  } catch (error) {
    console.log(error);

    // ❗ Axios 요청이 AbortSignal로 취소된 경우 처리
    if (
      error instanceof AxiosError &&
      (error.name === "CanceledError" || error.code === "ERR_CANCELED")
    ) {
      throw error; // 필요한 경우 로그만 남기고 무시해도 됨
    }

    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("실시간 메세지 조회 중 알 수 없는 오류가 발생했습니다.");
  }
};

/**
 * 믹명 메세지 조회
 * @param data
 * @returns
 */

export const getAnonyMessage = async (chatRoomId: number) => {
  try {
    const res = await api.get(`/api/chat-anon/${chatRoomId}`);

    if (res.data) {
      return res.data;
    } else {
      throw new Error("응답에 data가 없습니다");
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error("채팅방 참여 중 알 수 없는 오류가 발생했습니다.");
  }
};
