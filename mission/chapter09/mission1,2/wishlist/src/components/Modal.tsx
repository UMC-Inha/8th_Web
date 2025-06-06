// components/Modal.tsx
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const Modal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4">정말 모든 상품을 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
