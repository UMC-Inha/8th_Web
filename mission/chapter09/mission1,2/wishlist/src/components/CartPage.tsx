import CartList from "./CartList";
import PriceBox from "./PriceBox";
import Modal from "./Modal";
import { useSelector, useDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlices";
import { closeDeleteAllModal } from "../slices/modalSlices";

const CartPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isDeleteAllModalOpen);

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeDeleteAllModal());
  };

  const handleCancel = () => {
    dispatch(closeDeleteAllModal());
  };

  return (
    <div className="relative">
      {/* 리스트 + 가격 부분 */}
      <div className={isModalOpen ? "blur-sm pointer-events-none" : ""}>
        <CartList />
        <PriceBox />
      </div>

      {/* 모달은 여기! 블러 div 밖에 */}
      {isModalOpen && (
        <Modal
          onClose={handleCancel}
          onConfirm={handleConfirm}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};
export default CartPage;
