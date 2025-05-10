import { AxiosError } from "axios";
import { LoginFormData } from "../schemas/loginSchema";
import api from "./instance";

export interface SignupRequestData {
  //imageUrl?: string;
  email: string;
  password: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  accountBank: string;
  accountNumber: string;
}

/**
 * 회원가입
 * @param data - 회원가입 요청 데이터
 * @returns 회원정보
 */
export const postUser = async (data: SignupRequestData) => {
  try {
    const res = await api.post("/api/users", data);

    if (res.data.data) {
      return res.data.data;
    }
  } catch (error) {
    console.error("회원가입 실패:", error);
  }
};

/**
 * 닉네임 중복확인
 * @returns
 */
export const confirmNickname = async (nickname: string) => {
  try {
    const res = await api.get("/api/users/check-nickname", {
      params: { nickname },
    });

    if (res.data.data) {
      return res.data.data;
    } else {
      throw new Error("응답에 data가 없습니다");
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response?.data?.message) {
      throw new Error(error.response.data.message); // 서버 메시지를 직접 전달
    }
    throw new Error("닉네임 확인 중 오류가 발생했습니다.");
  }
};

/**
 * 로그인
 * @param email
 * @param password
 * @returns 회원정보
 */
export const login = async (data: LoginFormData) => {
  try {
    const res = await api.post("/api/users/token", data);

    if (res.data.data) {
      return res.data.data;
    } else {
      throw new Error("응답에 data가 없습니다");
    }
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error; // 🔥 다시 던지기!
  }
};

/**
 * 로그아웃
 * @returns
 */

export const logout = async () => {
  try {
    const res = await api.delete("/api/users/token");

    if (res.data) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    console.error("주문 취소 실패:", error);
    throw error;
  }
};

/**
 * 프로필 정보 조회
 * @returns
 */
export const getMyInfo = async () => {
  try {
    const res = await api.get("/api/users/profile");

    if (res.data.data) {
      return res.data.data; // 백엔드 응답 구조에 따라 수정
    }
  } catch (error) {
    console.error("내 프로필 조회 실패:", error);
  }
};
