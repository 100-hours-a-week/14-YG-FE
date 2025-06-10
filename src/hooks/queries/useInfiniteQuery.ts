import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getGroupBuyList } from "../../api/product";
import { GetGroupBuysParams, GroupBuyList } from "../../types/productType";

interface CursorParam {
  cursorId?: number;
  cursorCreatedAt?: string;
  cursorPrice?: number;
}

export const useInfiniteGroupBuys = (baseParams: GetGroupBuysParams) => {
  return useInfiniteQuery<
    GroupBuyList, // 각 페이지의 데이터 타입
    Error,
    InfiniteData<GroupBuyList>,
    [string, GetGroupBuysParams],
    CursorParam
  >({
    queryKey: ["groupBuyList-infinite", baseParams],
    queryFn: ({ pageParam }) => {
      const cursorParam = pageParam ?? {};
      console.log(pageParam);
      console.log("🚀 요청 params:", {
        ...baseParams,
        ...cursorParam,
        limit: 10,
      });

      return getGroupBuyList({
        ...baseParams,
        ...cursorParam,
        limit: 10,
      });
    },
    initialPageParam: {},
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      if (
        !lastPage ||
        typeof lastPage !== "object" ||
        !("hasMore" in lastPage) ||
        lastPage.hasMore === false
      ) {
        return undefined;
      }

      const next: CursorParam = {
        cursorId: lastPage.nextCursor,
      };

      if (
        baseParams.orderBy === "price_asc" ||
        baseParams.orderBy === "ending_soon"
      ) {
        next.cursorCreatedAt = lastPage.nextCreatedAt;
      }

      if (baseParams.orderBy === "price_asc") {
        next.cursorPrice = lastPage.nextCursorPrice;
      }

      return next;
    },
  });
};
