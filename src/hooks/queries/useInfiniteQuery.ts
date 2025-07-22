import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getGroupBuyList } from "../../api/product";
import { GetGroupBuysParams, GroupBuyList } from "../../types/productType";
import { useEffect, useMemo, useState } from "react";
import { Notification, PrevNoticeParams } from "../../types/notificationType";
import { usePrevNoticeQuery } from "./usePrevNoticeQuery";

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
  const [notices, setNotices] = useState<Notification[]>([]);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasNext, setHasNext] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  const params: PrevNoticeParams = useMemo(
    () => ({
      cursorId: cursor,
      size: 10,
    }),
    [cursor]
  );

  const { data, isLoading, isFetching } = usePrevNoticeQuery(params, {
    enabled: hasEntered,
  });

  useEffect(() => {
    // 최초 진입 시 1회 실행
    setHasEntered(true);
  }, []);

  useEffect(() => {
    if (data) {
      setNotices((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const newItems = data.items.filter((n) => !existingIds.has(n.id));
        return [...prev, ...newItems];
      });

      setHasNext(data.hasNext);
      if (data.hasNext) {
        setCursor(data.nextCursor);
      }
    }
  }, [data]);

  const fetchNext = () => {
    if (!isFetching && !isLoading && hasNext && data?.nextCursor != null) {
      setCursor(data.nextCursor);
    }
  };

  return {
    notices, // 리스트
    hasNext, // 다음 페이지 여부
    isLoading, // 최초 로딩
    isFetching, // 다음 페이지 가져오는 중인지
    fetchNext, // 관측됐을 때 호출할 함수
  };
};
