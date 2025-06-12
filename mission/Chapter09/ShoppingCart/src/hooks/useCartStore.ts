import { create } from "zustand";
import type { CartItems } from "../types/cart";

interface CartStore {
  cartItems: CartItems;
  total: number;
  amount: number;

  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  setInitialItems: (items: CartItems) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  total: 0,
  amount: 0,

  setInitialItems: (items) =>  set({
    cartItems: items.map((item) => ({ ...item })), 
  }),

  increase: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updated };
    }),

  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((item) => item.id === id);
      if (!item) return {};
      if (item.amount <= 1) {
        return {
          cartItems: state.cartItems.filter((item) => item.id !== id),
        };
      } else {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, amount: item.amount - 1 } : item
          ),
        };
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  calculateTotals: () => {
    const { cartItems } = get();
    const amount = cartItems.reduce((sum, i) => sum + i.amount, 0);
    const total = cartItems.reduce((sum, i) => sum + i.amount * i.price, 0);
    set({ amount, total });
  },
}));
