import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import "./Modal.css";

const Modal = () => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
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
