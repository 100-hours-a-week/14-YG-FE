import { useQuery } from "@tanstack/react-query";
import { getAccount, getGroupBuyList, getPost } from "../../api/product";
import {
  GetGroupBuysParams,
  GroupBuyList,
  PostProps,
} from "../../types/productType";
import { HostAccount } from "../../types/hostType";

export const useProductDetail = (postId: number) => {
  return useQuery<PostProps>({
    queryKey: ["postDetail", postId],
    queryFn: () => getPost(postId),
    enabled: !!postId,
  });
};

export const useHostAccount = (postId: number) => {
  return useQuery<HostAccount>({
    queryKey: ["hostAccount", postId],
    queryFn: () => getAccount(postId),
    enabled: !!postId,
  });
};

export const useGroupBuysList = (params?: GetGroupBuysParams) => {
  return useQuery<GroupBuyList>({
    queryKey: ["groupBuyList-single", params],
    queryFn: () => getGroupBuyList(params),
  });
};
