import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Lp } from '../../types/cart'
import cartItems from '../../constants/cartItems'

interface CartState {
  items: Lp[]
}

const initialState: CartState = {
  items: cartItems,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementAmount(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload)
      if (item) item.amount += 1
    },
    decrementAmount(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload)
      if (item && item.amount > 1) {
        item.amount -= 1
      } else {
        // 수량이 1 이하로 내려가지 않게, 필요하면 완전 제거
        state.items = state.items.filter(i => i.id !== action.payload)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
  },
})

export const { incrementAmount, decrementAmount, removeItem } = cartSlice.actions
export default cartSlice.reducer