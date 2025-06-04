import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalActions {
    openModal: () => void;
    closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
  immer((set, _) => ({
    isOpen: false,
    actions: {
      openModal: () => {
        set((state) => {
          state.isOpen = true;
        });
      },
      closeModal: () => {
        set((state) => {
          state.isOpen = false;
        });
      },
    },
  }))
);

// 외부에서 사용시
export const useModalState = () => {
    return useModalStore((state) => state.isOpen);
}
export const useModalActions = () => {
    return useModalStore((state) => state.actions);
}