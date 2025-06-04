import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";
import { useModalActions } from "../store/useModalStore";
import { useCartActions } from "../store/useCartStore";

export const Modal = () => {
  // // redux-toolkit
  // const isModalOpen = useSelector((state) => state.modal.isOpen);
  // const dispatch = useDispatch();

  // if (!isModalOpen) return null;

  //zustand
  const { closeModal } = useModalActions();
  const {clearCart } = useCartActions();

  // // redux-toolkit
  // const handleCloseModal = () => {
  //   dispatch(closeModal());
  // };
  // const handleClearCart = () => {
  //   dispatch(clearCart());
  //   dispatch(closeModal());
  // };

  //zustand
  const handleCloseModal = () => {
    closeModal();
  };
  const handleClearCart = () => {
    clearCart();
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center 
    bg-white/50 backdrop-blur-sm"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={handleCloseModal}
            className="p-2 w-18 bg-gray-300 rounded cursor-pointer 
            hover:bg-gray-400 shadow"
          >
            아니요
          </button>
          <button
            onClick={handleClearCart}
            className="p-2 w-10 bg-red-500 text-white rounded cursor-pointer 
            hover:bg-red-600 shadow"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};
