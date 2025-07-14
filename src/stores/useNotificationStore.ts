import { create } from "zustand";
import { Notification } from "../types/notificationType"; // 타입 불러오기

interface NotificationState {
  notifications: Notification[];
  add: (n: Notification) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  add: (n) => set((s) => ({ notifications: [n, ...s.notifications] })),
  clear: () => set({ notifications: [] }),
}));
