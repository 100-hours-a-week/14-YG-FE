import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNoticeStatus } from "../../../api/notification";

export const useChangeNoticeStatus = (notificationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postNoticeStatus(notificationId),
    onSuccess: () => {
      console.log("알림 읽음 처리 완료");
      queryClient.invalidateQueries({ queryKey: ["prevNotice"] });
    },
    onError: (err) => {
      if (err instanceof Error) {
        alert(err.message); // 서버에서 온 에러 메시지가 여기 들어있음
      } else {
        alert("알림 읽음 처리 중 알 수 없는 오류가 발생했습니다.");
      }
    },
  });
};
