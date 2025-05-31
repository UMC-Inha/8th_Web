import CartItem from "./CartItem";
import { useEffect } from "react";
import { useModalStore } from "../hooks/useModalStore";
import { useCartStore } from "../hooks/useCartStore";
import initialCartItems from "../constants/cartItems";
const CartList = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const calculateTotals = useCartStore((state) => state.calculateTotals);
  const setInitialItems = useCartStore((state) => state.setInitialItems);
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    setInitialItems(initialCartItems);
  }, []);
  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-10 mb-4 hover:bg-gray-600"
        onClick={() => openModal()}
      >
        전체 삭제
      </button>
    </div>
  );
};

export default CartList;
