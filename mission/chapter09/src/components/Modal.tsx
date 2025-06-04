import { useModalStore } from "../app/useModalStore";
import { useCartStore } from "../app/useCartStore";
import "./Modal.css";

const Modal = () => {
  const { closeModal } = useModalStore();
  const { clearCart } = useCartStore();

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <p>정말 삭제하시겠습니까?</p>
        <div className="modal-btns">
          <button className="btn cancel" onClick={handleCancel}>
            아니요
          </button>
          <button className="btn confirm" onClick={handleConfirm}>
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
