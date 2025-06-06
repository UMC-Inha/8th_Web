import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { calculateTotals } from "../slices/cartSlices";

const Navbar = () => {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  return (
    <nav className="w-full bg-gray-800 text-white">
      <div className="w-full max-w-3xl mx-auto flex justify-between items-center p-4">
        <h1
          onClick={() => (window.location.href = "/")}
          className="text-2xl font-semibold cursor-pointer"
        >
          Michael의 장바구니
        </h1>
        <div className="flex space-x-2">
          <FaShoppingCart className="text-2xl" />
          <span className="text-xl font-medium">{amount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
