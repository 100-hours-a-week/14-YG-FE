import { useMutation } from "@tanstack/react-query";
import { writePost } from "../../../api/host";
import { PostRequestData } from "../../../types/productType";
import { useNavigate } from "react-router-dom";

export const usePostMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: PostRequestData) => writePost(data),
    onSuccess: (data) => {
      console.log("공구글 게시 성공:", data);
      navigate(`/products/${data.data.postId}`, { replace: true });
    },
    onError: (err) => {
      console.error("공구글 게시 실패", err);
      alert("공구글 게시에 실패했습니다ㅠㅠ");
    },
  });
};
