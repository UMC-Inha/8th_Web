import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCartInfo, useCartActions } from "../hooks/useCartStore";
import ConfirmModal from "./ConfirmModal";

const Navbar = () => {
  const { amount } = useCartInfo();
  const { calculateTotals } = useCartActions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <h1
          onClick={() => (window.location.href = "/")}
          className="text-2xl text-white font-semibold cursor-pointer"
        >
          Ohthani Ahn
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative text-white"
          >
            <FaShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {amount}
            </span>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;