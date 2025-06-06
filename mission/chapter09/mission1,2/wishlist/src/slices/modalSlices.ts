import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isDeleteAllModalOpen: boolean;
}

const initialState: ModalState = {
  isDeleteAllModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openDeleteAllModal(state) {
      state.isDeleteAllModalOpen = true;
    },
    closeDeleteAllModal(state) {
      state.isDeleteAllModalOpen = false;
    },
  },
});

export const { openDeleteAllModal, closeDeleteAllModal } = modalSlice.actions;
export default modalSlice.reducer;
