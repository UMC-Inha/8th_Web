import { useModalStore } from "../hooks/useModalStore";
import { useCartStore } from "../hooks/useCartStore";

const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl space-y-5 w-90">
        <p className="text-lg font-medium">
          정말 모든 항목을 삭제하시겠습니까?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              clearCart();
              closeModal();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-gray-600"
          >
            네
          </button>
          <button
            onClick={() => {
              closeModal();
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-600"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
