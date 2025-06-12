import { useMutation } from "@tanstack/react-query";
import { getAI } from "../../../api/host";
import { AIResponse } from "../../../types/hostType";
import { UseFormSetValue } from "react-hook-form";
import { AxiosError } from "axios";
import { EditPostFormData } from "../../../schemas/editPostSchema";

export const useGetAIMutation = (
  setValue: UseFormSetValue<EditPostFormData>, // ✅ 타입 안전하게 정의
  setIsAISubmitted: (v: boolean) => void
) => {
  return useMutation<AIResponse, Error, string>({
    mutationFn: getAI,

    onSuccess: (data) => {
      setValue("description", data.summary, { shouldValidate: true });
      setValue("title", data.title, { shouldValidate: true });
      setValue("name", data.product_name, { shouldValidate: true });
      setValue("price", data.total_price, { shouldValidate: true });
      setValue("totalAmount", data.count, { shouldValidate: true });
      setIsAISubmitted(true);
      console.log(data);
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      setValue("description", "", { shouldValidate: true });
      setValue("title", "", { shouldValidate: true });
      setValue("name", "", { shouldValidate: true });
      setValue("price", 0, { shouldValidate: true });
      setValue("totalAmount", 0, { shouldValidate: true });

      if (axiosError.response?.status === 500) {
        alert(
          "서버에서 상품 정보를 읽지 못했어요😓\n다른 url을 입력해주시거나, 상품 정보를 직접 작성해주세요!"
        );
      } else {
        alert(
          `🤖💦\nAI가 이 URL을 잘 이해하지 못했어요 😢\n죄송합니다! 더 똑똑해질 수 있도록 노력할게요 🙇‍♀️🙇‍♂️`
        );
      }
      console.error("ai 응답 생성 실패", error);
    },
  });
};
