import { useEffect } from "react";
import { useNotificationStore } from "../stores/useNotificationStore";
import { useUserStore } from "../stores/useUserStore";

export const useNotificationSSE = (lastEventId?: number) => {
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) return;

    const url = `/api/sse/notifications${lastEventId ? `?lastEventId=${lastEventId}` : ""}`;
    const eventSource = new EventSource(url);

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
