import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

const CartList = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-10 mb-4 hover:bg-gray-600"
        onClick={() => dispatch(openModal())}
      >
        전체 삭제
      </button>
    </div>
  );
};

export default CartList;
