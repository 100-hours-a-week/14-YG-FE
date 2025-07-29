import { useEffect } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import { useUserStore } from "../stores/useUserStore";
import { EventSourcePolyfill } from "event-source-polyfill";

export const useNotificationSSE = () => {
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) return;

    const url = "/api/notifications/sse";

    const isLocal = window.location.hostname === "localhost";

    const eventSource = new EventSourcePolyfill(url, {
      headers: isLocal
        ? {
            // 로컬에서만 Authorization 헤더 수동 추가
            Authorization: `Bearer `,
          }
        : undefined,
      withCredentials: !isLocal, // ✅ 꼭 필요
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
      console.log("📨 SSE 수신:", data);
      useNotificationStore.getState().add(data);
    };

    eventSource.onerror = (e) => {
      console.error("❌ SSE 오류", e);
    };

    return () => {
      eventSource.close();
    };
  }, [user]);
};
