import axios from "axios";
import api from "./instance";
import { EditPostRequest, PostRequestData } from "../types/productType";
import { GetMyListParams } from "../types/userType";

/**
 * 공구글 작성
 * @param data
 * @returns
 */

export const writePost = async (data: PostRequestData) => {
  try {
    const res = await api.post("/api/group-buys", data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("게시 실패:", error.response?.data || error.message);
    } else {
      console.error("게시 실패: 알 수 없는 에러", error);
    }
    throw error;
  }
};

/**
 * 공구글 수정 전 정보 조회
 * @param postId
 * @param data
 * @returns
 */

export const getEditPost = async (postId: number) => {
  try {
    const res = await api.get(`/api/group-buys/${postId}/edit`);
    if (res.data.data) {
      return res.data.data;
    } else {
      alert("해당 공구글 정보가 없습니다.");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("공구글 조회 실패:", error.response?.data || error.message);
    } else {
      console.error("공구글 조회 실패: 알 수 없는 에러", error);
    }
    throw error;
  }
};

/**
 * 공구글 수정
 * @param postId
 * @param data
 * @returns
 */

export const editPost = async (postId: number, data: EditPostRequest) => {
  try {
    const res = await api.patch(`/api/group-buys/${postId}`, data);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("수정 실패:", error.response?.data || error.message);
    } else {
      console.error("수정 실패: 알 수 없는 에러", error);
    }
    throw error;
  }
};

/**
 * 공구글 삭제
 * @param postId
 * @param data
 * @returns
 */

export const deletePost = async (postId: number) => {
  try {
    const res = await api.delete(`/api/group-buys/${postId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("삭제 실패:", error.response?.data || error.message);
    } else {
      console.error("삭제 실패: 알 수 없는 에러", error);
    }
    throw error;
  }
};

/**
 * 상품 설명 생성 - AI
 * @returns
 */

export const getAI = async (url: string) => {
  try {
    const res = await api.post("api/group-buys/generation/description", url);
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("설명 생성 실패:", error.response?.data || error.message);
    } else {
      console.error("알 수 없는 에러", error);
    }
    throw error;
  }
};

/**
 * 주최목록 조회
 * @returns
 */
export const getHostList = async (params?: GetMyListParams) => {
  try {
    const res = await api.get("/api/group-buys/users/me/hosts", { params });

    if (res.data.data) {
      return res.data.data;
    }
  } catch (error) {
    console.error("주최목록 조회 실패:", error);
    throw error;
  }
};
