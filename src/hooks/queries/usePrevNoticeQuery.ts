import { useQuery } from "@tanstack/react-query";
import { getPrevNotice } from "../../api/notification";
import {
  PrevNoticeParams,
  PrevNoticeResponse,
} from "../../types/notificationType";

export const usePrevNoticeQuery = (
  params?: PrevNoticeParams,
  options?: { enabled?: boolean }
) => {
  return useQuery<PrevNoticeResponse>({
    queryKey: ["prevNotice", params?.cursorId],
    queryFn: () => getPrevNotice(params),
    enabled: options?.enabled ?? true,
  });
};
