// hooks/mutations/user/usePostLikeMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteLike, postLike } from "../../../api/user";
import { GetMyListParams } from "../../../types/userType";

export const usePostLikeMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLike(postId),
    onSuccess: () => {
      // 예: 관심 공구 목록이나 post 상세 refetch
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
    },
    onError: (error: AxiosError) => {
      console.error("관심 등록 실패", error);
    },
  });
};

export const useDeleteLikeMutation = (
  postId: number,
  params?: GetMyListParams
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLike(postId),
    onSuccess: () => {
      // 예: 관심 공구 목록이나 post 상세 refetch
      queryClient.invalidateQueries({ queryKey: ["postDetail", postId] });
      queryClient.invalidateQueries({ queryKey: ["likedList", params] }); // ✅ 관심목록 갱신
    },
    onError: (error: AxiosError) => {
      console.error("관심 취소 실패", error);
    },
  });
};
