import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";
import { useCartActions, useCartInfo } from "../store/useCartStore";
import { useModalActions, useModalState } from "../store/useModalStore";
import { Modal } from "./Modal";

export const PriceBox = () => {
  // // redux-toolkit
  // const { total } = useSelector((state) => state.cart);
  // const dispatch = useDispatch();
  // const isModalOpen = useSelector((state) => state.modal.isOpen)

  // zustand
  const { total } = useCartInfo();
  const isModalOpen  = useModalState();
  // console.log("isOpen 상태:", isModalOpen);
  const { openModal } = useModalActions();

  // // redux-toolkit
  // const handleOpenModal = () => {
  //   dispatch(openModal());
  // };

  // zustand
  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className="flex justify-between p-12">
      <div>
        <button
          onClick={handleOpenModal}
          className="p-4 border rounded-md cursor-pointer hover:bg-gray-300"
        >
          전체 삭제
        </button>
        {/* {조건부 렌더링: 버튼을 눌러 handleOpenMidal이 실행되면 
        isModalOpen이 true가 되고, 그렇기에 Modal이 렌더링된다.} */}
        {isModalOpen && <Modal />}
      </div>
      총 가격: {total} won
    </div>
  );
};
