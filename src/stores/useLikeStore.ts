import { create } from "zustand";

interface LikeState {
  likedItems: Set<number>;
  toggleLike: (id: number) => void;
  isLiked: (id: number) => boolean;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likedItems: new Set(),
  toggleLike: (id) => {
    const current = get().likedItems;
    const newSet = new Set(current);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }

    set({ likedItems: newSet });
  },
  isLiked: (id) => get().likedItems.has(id),
}));
