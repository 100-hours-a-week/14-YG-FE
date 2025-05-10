import { create } from "zustand";

interface OrderState {
  postId: number;
  productName: string;
  unitPrice: number;
  unitAmount: number;
  totalAmount: number;
  leftAmount: number;
  hostAccountBank: string;
  hostAccountNumber: string;
}

interface OrderStore extends OrderState {
  setOrderInfo: (info: OrderState) => void;
  resetOrderInfo: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  postId: 0,
  productName: "",
  unitPrice: 0,
  unitAmount: 0,
  totalAmount: 0,
  leftAmount: 0,
  hostAccountBank: "",
  hostAccountNumber: "",
  setOrderInfo: (info) => set(info),
  resetOrderInfo: () =>
    set({
      postId: 0,
      productName: "",
      unitPrice: 0,
      unitAmount: 0,
      totalAmount: 0,
      leftAmount: 0,
      hostAccountBank: "",
      hostAccountNumber: "",
    }),
}));
