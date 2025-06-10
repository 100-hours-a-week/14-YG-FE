import { create } from "zustand";
import { OrderResponse } from "../types/orderType";

export type ModalType = "login" | "confirm" | "order" | "success" | "host";

export type ConfirmPayload = {
  confirmTitle?: string;
  subDescription?: React.ReactNode;
  confirmDescription?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export type ModalPayloadMap = {
  confirm: ConfirmPayload;
  success: OrderResponse;
  login: undefined;
  order: undefined;
  host: undefined;
  null: undefined;
};

interface ModalState {
  openedModal: ModalType | null;
  payload?: ConfirmPayload | OrderResponse;

  openModal: <T extends ModalType>(
    type: T,
    payload?: ModalPayloadMap[T]
  ) => void;

  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openedModal: null,
  payload: undefined,

  openModal: (type, payload) => {
    set({ openedModal: type, payload });
  },

  closeModal: () => {
    set({ openedModal: null, payload: undefined });
  },
}));
