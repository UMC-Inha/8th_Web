import { create } from "zustand";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

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

  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        // // <immer를 사용하지 않으면>
        // set((state) => ({
        //     // 배열 복사(map), item 받기,
        //     // id가 같으면 -> 기존 item은 유지(불변성 유지)하고 amount값만 +1 변화
        //   cartItems: state.cartItems.map((item) =>
        //     item.id === id ? { ...item, amount: item.amount + 1 } : item
        //   ),
        // }));

        // <immer를 사용하면 (zustand)>
        set((state) => {
          // find로 바꾸고 싶은 값만 쓰면 됨
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          // 내가 클릭한 것 이외 나머지를 보여주도록
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item) => {
            //하나씩 순회
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

// 외부에선 cartItems,amount,total 이랑 actions 분리해서 활용할거임

export const useCartInfo = () => {
  return useCartStore(
    // useShallow 없이 여러값을 한번에 선택해오면,
    // 상태가 업데이트 될때마다 매번 새 객체가 만들어짐 -> 불필요한 리렌더
    // useShallow(얕은 비교)로 실제 값이 바뀐 경우에만 컴포넌트 리렌더링
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );
};

export const useCartActions = () => {
  return useCartStore((state) => state.actions);
};
