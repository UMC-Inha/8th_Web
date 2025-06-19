import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
    isOpen : boolean;
    message : string;
    onConfirm? : () => void;
}

const initialState : ModalState = {
    isOpen : false,
    message : "",
    onConfirm : undefined,
}

const modalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers : {
        openModal : (state, action : PayloadAction<{ message : string, onConfirm : () => void }>) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.onConfirm = action.payload.onConfirm;
        },

        closeModal : (state) => {
            state.isOpen = false;
            state.message = "";
            state.onConfirm = undefined;
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions

const modalReducer = modalSlice.reducer;

export default modalReducer