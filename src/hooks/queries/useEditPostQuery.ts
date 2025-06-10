import { useQuery } from "@tanstack/react-query";
import { EditPostData } from "../../types/productType";
import { getEditPost } from "../../api/host";

export const useEditPostQuery = (postId: number) => {
  return useQuery<EditPostData>({
    queryKey: ["postDetail-edit", postId],
    queryFn: () => getEditPost(postId),
    enabled: !!postId,
  });
};
