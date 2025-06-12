import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../../api/host";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const useDeletePostMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      alert("공구글이 성공적으로 삭제되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        alert(message);
      } else {
        alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("공구글 삭제 실패:", error);
      }
    },
  });
};
