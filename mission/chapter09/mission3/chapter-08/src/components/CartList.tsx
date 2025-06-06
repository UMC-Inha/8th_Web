import CartItem from "./CartItem";
import Modal from "./Modal";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useModalStore } from "../store/modalStore";

const CartList = () => {
  const { cartItems } = useCartInfo()
  const { clearCart } = useCartActions()

  const isModalOpen = useModalStore((state) => state.isOpen)
  const openModal = useModalStore((state) => state.openModal)

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 border border-black rounded"
        onClick={openModal}
      >
        전체 삭제
      </button>

      {isModalOpen && <Modal />}
    </div>
  );
};

export default CartList;
