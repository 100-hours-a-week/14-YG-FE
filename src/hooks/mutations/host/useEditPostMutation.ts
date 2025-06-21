import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../../api/host";
import { EditPostRequest } from "../../../types/productType";
import { useNavigate } from "react-router-dom";

export const useEditPostMutation = (postId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditPostRequest) => editPost(postId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["postDetail-edit", postId],
      });
      console.log("공구글 수정 성공:", data);
      navigate(`/products/${data.data.postId}`);
    },
    onError: (err) => {
      console.error("공구글 수정 실패", err);
      alert("공구글 수정에 실패했습니다ㅠㅠ");
    },
  });
};
