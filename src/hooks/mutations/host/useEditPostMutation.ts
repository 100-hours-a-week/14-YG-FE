// useEditPostMutation.ts
import { useMutation } from "@tanstack/react-query";
import { editPost } from "../../../api/host";
import { EditPostRequest } from "../../../types/productType";
import { useNavigate } from "react-router-dom";

export const useEditPostMutation = (postId: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: EditPostRequest) => editPost(postId, data),
    onSuccess: (data) => {
      console.log("공구글 수정 성공:", data);
      navigate(`/products/${data.data.postId}`);
    },
    onError: (err) => {
      console.error("공구글 수정 실패", err);
      alert("공구글 수정에 실패했습니다ㅠㅠ");
    },
  });
};
