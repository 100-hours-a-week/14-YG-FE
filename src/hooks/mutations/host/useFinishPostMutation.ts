import { useMutation } from "@tanstack/react-query";
import { finishPost } from "../../../api/host";
import { AxiosError } from "axios";

export const useFinishPostMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => finishPost(postId),
    onSuccess: () => {
      alert("공구가 종료되었습니다.");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        alert(message);
      } else {
        alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("공구 종료 실패:", error);
      }
    },
  });
};
