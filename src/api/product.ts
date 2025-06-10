import { GetGroupBuysParams } from "../types/productType";
import api from "./instance";

/**
 * 공동구매 전체 리스트 조회
 * @param params - 정렬, 카테고리, 커서 정보, 개수 제한 등
 * @returns 공동구매 게시글 리스트
 */
export const getGroupBuyList = async (params?: GetGroupBuysParams) => {
  try {
    const res = await api.get("/api/group-buys", { params });

    if (res.data.data) {
      console.log(res.data.data);
      return res.data.data; // 백엔드 응답 구조에 따라 수정
    }
  } catch (error) {
    console.error("공동구매 리스트 조회 실패:", error);
  }
};

/**
 * 상세 게시글 조회
 * @param postId
 * @returns
 */
export const getPost = async (postId: number) => {
  try {
    const res = await api.get(`/api/group-buys/${postId}`);

    if (res.data.data) {
      return res.data.data; // 백엔드 응답 구조에 따라 수정
    }
  } catch (error) {
    console.error("공동구매 리스트 조회 실패:", error);
  }
};

/**
 * 계좌번호 조회
 * @param postId
 * @returns
 */
export const getAccount = async (postId: number) => {
  try {
    const res = await api.get(`/api/group-buys/${postId}/host/account`);

    if (res.data.data) {
      return res.data.data; // 백엔드 응답 구조에 따라 수정
    }
  } catch (error) {
    console.error("공동구매 리스트 조회 실패:", error);
  }
};
