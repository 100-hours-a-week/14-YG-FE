import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "../../api/order";
import {
  GetMyListParams,
  ListPostProps,
  MyListProps,
} from "../../types/userType";
import { getHostList } from "../../api/host";
import { getLikeList } from "../../api/user";

export const useOrderList = (params?: GetMyListParams) => {
  return useQuery<MyListProps, Error, ListPostProps[]>({
    queryKey: ["partiList", params],
    queryFn: () => getOrderList(params),
    select: (data) => data.posts,
  });
};

export const useHostList = (params?: GetMyListParams) => {
  return useQuery<MyListProps, Error, ListPostProps[]>({
    queryKey: ["hostList", params],
    queryFn: () => getHostList(params),
    select: (data) => data.posts,
  });
};

export const useLikedList = (params?: GetMyListParams) => {
  return useQuery<MyListProps, Error, ListPostProps[]>({
    queryKey: ["likedList", params],
    queryFn: () => getLikeList(params),
    select: (data) => data.posts,
  });
};
