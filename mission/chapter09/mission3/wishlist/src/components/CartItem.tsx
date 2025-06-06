import type { Lp } from "../types/cart";
import { useCartActions } from "../hooks/useCartStore";
interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();
  const handleIncrement = () => {
    increase(lp.id);
  };
  const handledecrement = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <div className="flex items-center p-4 border-b boder-gray-200">
      <img
        src={lp.img}
        alt={`${lp.title}의 이미지`}
        className="w-20 h-20 object-cover mr-4"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-gray-600 text-sm">{lp.singer}</p>
        <p className="text-gray-600 font-bold text-sm">{lp.price} 원</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handledecrement}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-300">
          {lp.amount}
        </span>
        <button
          onClick={handleIncrement}
          className="px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
