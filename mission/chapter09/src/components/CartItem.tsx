import { useDispatch } from "../hooks/useCustomRedux";
import { increase, decrease, removeItem } from "../slices/cartSlice";
import { useCartActions } from "../store/useCartStore";
import type { Lp } from "../types/cart"; // 타입 전용 import

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  // // redux-toolkit
  // const dispatch = useDispatch();

  // zustand
  const { increase, decrease, removeItem } = useCartActions();
  
  // // redux-toolkit
  // const handleIncreaseCount = () => {
  //   dispatch(increase({ id: lp.id }));
  // };
  // const handleDecreaseCount = () => {
  //   if (lp.amount === 1) {
  //     dispatch(removeItem({ id: lp.id }));
  //     return;
  //   }
  //   dispatch(decrease({ id: lp.id }));

  //zustand
  const handleIncreaseCount = () => {
    increase(lp.id);
  };
  const handleDecreaseCount = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <div className="flex items-center p-4 border-b border-gray-300">
      <img
        className="w-20 h-20 object-cover rounded-md mr-4"
        src={lp.img}
        alt={`${lp.title}의 LP 이미지`}
      />

      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm text-gray-600 font-bold">{lp.price} won</p>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleDecreaseCount}
          className="px-3 py-1 rounded-l cursor-pointer
        text-gray-800 bg-gray-300 hover:bg-gray-400"
        >
          -
        </button>
        <span className="px-4 py-[3px] border-y border-gray-300">
          {lp.amount}
        </span>
        <button
          onClick={handleIncreaseCount}
          className="px-3 py-1 rounded-r cursor-pointer
        text-gray-800 bg-gray-300 hover:bg-gray-400"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
