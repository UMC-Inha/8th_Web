import { create } from "zustand";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from 'zustand/shallow'

interface CartActions {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;

    actions: CartActions
}

export const useCartStore = create<CartState>()(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    immer((set, _) => ({
        cartItems: cartItems,
        amount: 0,
        total: 0,
        actions: {
            increase: (id: string): void => {
                // set((state) => ({
                //     cartItems: state.cartItems.map((item) => {
                //         item.id === id ? { ...item, amount: item.amount + 1 } : item
                //     })
                // }))
                // immer를 사용하지 않았을 때!
                set((state) => {
                    const cartItem = state.cartItems.find((item) => item.id === id);
                    if (cartItem) {
                        cartItem.amount += 1;
                    }
                });
            },
            decrease: (id: string): void => {
                set((state) => {
                    const cartItem = state.cartItems.find((item) => item.id === id);
                    if (cartItem && cartItem.amount > 0) {
                        cartItem.amount -= 1;
                    }
                });
            },
            removeItem: (id: string): void => {
                set((state) => {
                    state.cartItems = state.cartItems.filter((item) => item.id !== id);
                });
            },
            clearCart: (): void => {
                set((state) => {
                    state.cartItems = [];
                });
            },
            calculateTotals: (): void => {
                set((state) => {
                    let amount = 0, total = 0;
                    state.cartItems.forEach((item) => {
                        amount += item.amount;
                        total += item.amount * item.price;
                    });

                    state.amount = amount;
                    state.total = total;
                });
            },
        },
    }))
);

export const useCartInfo = () => useCartStore(
    useShallow((state: { cartItems: any; amount: any; total: any; }) => ({
        cartItems: state.cartItems,
        amount: state.amount,
        total: state.total
    })));

export const useCartActions = () => useCartStore((state) => state.actions);
