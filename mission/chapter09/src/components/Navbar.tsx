import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";
import { useCartInfo, useCartActions } from "../store/useCartStore";

export const Navbar = () => {
  // // redux-toolkit
  // const { amount, cartItems } = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  //zustand
  const {amount, cartItems} = useCartInfo();
  const {calculateTotals} = useCartActions();

  // 수량이 변할때마다 총 amount와 총 total 가격에 적용하여 렌더링

  // // redux-toolkit
  // useEffect(() => {
  //   dispatch(calculateTotals());
  // }, [dispatch, cartItems]);

  //zustand
  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals])

  return (
    <div
      className="flex justify-between items-center p-4
    bg-gray-800 text-white"
    >
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-2xl font-semibold cursor-pointer"
      >
        TERI
      </h1>
      <div className="flex items-center gap-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};
