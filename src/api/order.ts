import { AxiosError } from "axios";
import { GetOrderParams, OrderRequestData } from "../types/orderType";
import api from "./instance";

/**
 * 주문 등록
 * @param data
 * @returns
 */

export const postOrder = async (data: OrderRequestData) => {
  try {
    const res = await api.post("/api/orders", data);

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
    throw new Error("주문 중 알 수 없는 오류가 발생했습니다.");
  }
};

/**
 * 주문 취소
 * @param postId
 * @returns
 */

export const deleteOrder = async (postId: number) => {
  try {
    const res = await api.delete(`/api/group-buys/${postId}/participants`);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.error("주문 취소 실패:", error);
  }
};

/**
 * 참여목록 조회
 * @returns
 */
export const getOrderList = async (params?: GetOrderParams) => {
  try {
    const res = await api.get("/api/group-buys/user/participants", { params });

    if (res.data.data) {
      return res.data.data;
    }
  } catch (error) {
    console.error("공동구매 리스트 조회 실패:", error);
    throw error;
  }
};
