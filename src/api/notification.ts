import { AxiosError } from "axios";
import api from "./instance";
import { PrevNoticeParams } from "../types/notificationType";

/**
 * 과거 알림 리스트 조회
 * @returns
 */
export const getPrevNotice = async (params?: PrevNoticeParams) => {
  try {
    const res = await api.get("/api/notifications/latest", { params });

    if (res.data.data) {
      return res.data.data;
    }
  } catch (error) {
    console.error("과거 알림 조회 실패:", error);
    if (error instanceof AxiosError && error.response?.data?.message) {
      throw new Error(error.response.data.message); // 서버 메시지를 직접 전달
    }
    throw new Error("과거 알림을 불러오던 중 오류가 발생했습니다.");
  }
};

/**
 * 알림 읽음 처리
 * @returns
 */
export const postNoticeStatus = async (notificationId: number) => {
  try {
    await api.patch(`/api/notifications/${notificationId}`, { read: true });
  } catch (error) {
    console.error("알림 읽음 처리 실패:", error);
    if (error instanceof AxiosError && error.response?.data?.message) {
      throw new Error(error.response.data.message); // 서버 메시지를 직접 전달
    }
    throw new Error("알림 읽음 처리 중 오류가 발생했습니다.");
  }
};
