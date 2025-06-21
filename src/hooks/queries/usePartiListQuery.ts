import { useQuery } from "@tanstack/react-query";
import { getPartiList } from "../../api/host";
import { OrderPartiData } from "../../types/hostType";

export const usePartiListQuery = (postId: number) => {
  return useQuery<OrderPartiData[]>({
    queryKey: ["partiList", postId],
    queryFn: () => getPartiList(postId),
    enabled: !!postId,
  });
};
