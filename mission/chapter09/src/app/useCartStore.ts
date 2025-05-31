import { create } from "zustand";
import cartItemsData from "../constants/cartItems";

export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: cartItemsData,
  totalQuantity: 0,
  totalAmount: 0,

  increase: (id) => {
    set((state) => {
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updatedItems };
    });
    get().calculateTotals();
  },

  decrease: (id) => {
    set((state) => {
      const updatedItems = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);
      return { cartItems: updatedItems };
    });
    get().calculateTotals();
  },

  removeItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
    get().calculateTotals();
  },

  clearCart: () => {
    set({ cartItems: [] });
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cartItems } = get();
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * item.amount,
      0
    );
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.amount, 0);
    set({ totalAmount, totalQuantity });
  },
}));
