import { useCartActions } from "../hooks/useCartStore";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
  const { clearCart } = useCartActions();

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-4">정말 장바구니를 비우시겠습니까?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            아니요
          </button>
          <button
            onClick={() => {
              clearCart();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
}