import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../hooks/useCartStore";

const Navbar = () => {
  const amount = useCartStore((state) => state.amount);
  return (
    <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-2xl font-semibold">Thunder</h1>
      <div className="flex items-center space-x-3">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-semibold">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
