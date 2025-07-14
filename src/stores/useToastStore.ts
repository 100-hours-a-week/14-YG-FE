import { create } from "zustand";

interface ToastState {
  message: string;
  isVisible: boolean;
  isDisabled: boolean;
  showToast: (msg: string, duration?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  isVisible: false,
  isDisabled: false,
  showToast: (msg, duration = 2000) => {
    set({ message: msg, isVisible: true, isDisabled: true });

    setTimeout(() => {
      set({ isVisible: false });
    }, duration);

    setTimeout(() => {
      set({ isDisabled: false });
    }, duration); // 비활성화 시간 = 토스트 표시 시간과 동일
  },
  hideToast: () => set({ isVisible: false, isDisabled: false }),
}));
