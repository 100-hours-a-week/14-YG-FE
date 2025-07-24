import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getGroupBuyList } from "../../api/product";
import { GetGroupBuysParams, GroupBuyList } from "../../types/productType";
import {
  PrevNoticeParams,
  PrevNoticeResponse,
} from "../../types/notificationType";
import { getPrevNotice } from "../../api/notification";
import { useMemo } from "react";

interface CursorParam {
  cursorId?: number;
  cursorCreatedAt?: string;
  cursorPrice?: number;
  cursorSoldRatio?: number;
}

export const useInfiniteGroupBuys = (baseParams: GetGroupBuysParams) => {
  const { orderBy, category, openOnly, keyword } = baseParams;

  return useInfiniteQuery<
    GroupBuyList, // 각 fetch에서 반환하는 페이지 단위 데이터
    Error, // error 타입
    InfiniteData<GroupBuyList>, // 최종 data 타입 (가공 없음)
    [string, string, number | "all", boolean, string], // queryKey 타입
    CursorParam // pageParam 타입
  >({
    queryKey: [
      "groupBuyList-infinite",
      orderBy ?? "latest",
      category ?? "all",
      openOnly ?? false,
      keyword ?? "",
    ],
    queryFn: ({ pageParam }) => {
      const cursorParam = pageParam ?? {};
      const params = {
        orderBy,
        ...(category ? { category } : {}),
        ...(openOnly ? { openOnly: true } : {}),
        ...(keyword ? { keyword } : {}),
        ...cursorParam,
        limit: 10,
      };

      console.log("🚀 요청 params:", params);
      return getGroupBuyList(params);
    },
    initialPageParam: {},
    getNextPageParam: (lastPage) => {
      if (!lastPage?.hasMore) return undefined;

      const next: CursorParam = {
        cursorId: lastPage.nextCursor,
      };

      next.cursorCreatedAt = lastPage.nextCreatedAt;

      if (orderBy === "price_asc") {
        next.cursorPrice = lastPage.nextCursorPrice;
      }

      if (orderBy === "ending_soon") {
        next.cursorSoldRatio = lastPage.nextSoldRatio;
      }

      return next;
    },
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useInfinitePrevNotices = () => {
  const now = useMemo(() => Date.now(), []);
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery<
      PrevNoticeResponse, // fetch 결과 타입 (단일 페이지)
      Error, // error 타입
      InfiniteData<PrevNoticeResponse>, // ✅ 전체 데이터 (pages[] 포함)
      [string, number], // queryKey
      number | undefined // pageParam 타입
    >({
      queryKey: ["prevNotices", now],
      queryFn: ({ pageParam }) => {
        const params: PrevNoticeParams = {
          cursorId: pageParam, // pageParam이 number | undefined
          size: 10,
        };
        return getPrevNotice(params);
      },
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined, // ✅ 초기값을 undefined로
      staleTime: 1000 * 60,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const notices = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    notices,
    hasNext: !!hasNextPage,
    isFetching,
    isLoading,
    fetchNext: fetchNextPage,
  };
};
