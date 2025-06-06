import CartItem from "./CartItem";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";
import type { RootState } from "../store/store";

const CartList = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 border border-black rounded"
        onClick={() => dispatch(openModal())}
      >
        전체 삭제
      </button>

      {isModalOpen && <Modal />}
    </div>
  );
};

export default CartList;
