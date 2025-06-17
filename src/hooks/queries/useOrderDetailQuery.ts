import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "../../api/order";
import { OrderResponse } from "../../types/orderType";

export const useOrderDetailQuery = (postId: number) => {
  return useQuery<OrderResponse>({
    queryKey: ["orderDetail", postId],
    queryFn: () => getOrderDetail(postId),
    enabled: !!postId,
  });
};
