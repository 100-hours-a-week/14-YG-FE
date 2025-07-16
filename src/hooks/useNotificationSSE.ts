import { useEffect } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import { useUserStore } from "../stores/useUserStore";
import { EventSourcePolyfill } from "event-source-polyfill";

export const useNotificationSSE = (lastEventId?: number) => {
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) return;

    const url = `/api/sse/notifications${lastEventId ? `?lastEventId=${lastEventId}` : ""}`;

    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        // 강제로 쿠키 붙이려면 필요 시 Authorization 헤더도 사용 가능
        // "Authorization": `Bearer ${yourToken}`,
      },
      withCredentials: true, // ✅ 꼭 필요
      // 내부적으로 fetch를 사용하기 때문에 credentials 포함 필요
      fetch: (input, init = {}) => {
        return fetch(input, {
          ...init,
          credentials: "include", // ✅ 핵심: 쿠키 포함
        });
      },
    });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      useNotificationStore.getState().add(data);
    };

    eventSource.onerror = (e) => {
      console.error("❌ SSE 오류", e);
    };

    return () => {
      eventSource.close();
    };
  }, [user, lastEventId]);
};
