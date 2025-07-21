import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMyInfo, HaltQueryError } from "../../api/user";
import { useUserStore } from "../../stores/useUserStore";
import { useModalStore } from "../../stores/useModalStore";

export const useMyInfoQuery = () => {
  const { setUser, clearUser } = useUserStore();
  const openModal = useModalStore((s) => s.openModal);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["myInfo"],
    queryFn: async () => {
      try {
        const res = await getMyInfo();
        setUser(res);
        console.log(res);
        return res;
      } catch (err) {
        if (err instanceof HaltQueryError) {
          clearUser();
          throw err;
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: (count, error) => {
      return !(error instanceof HaltQueryError) && count < 1;
    },
  });

  useEffect(() => {
    if (query.error instanceof HaltQueryError) {
      queryClient.removeQueries({ queryKey: ["hostAccount"] });
    }
  }, [query.error, queryClient, openModal]);

  return query;
};
