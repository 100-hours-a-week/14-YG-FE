import { create } from "zustand";

export const useChatRoomStore = create<{
  title: string;
  setTitle: (title: string) => void;
}>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
}));
