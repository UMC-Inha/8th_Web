import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openDeleteAllModal } from "../slices/modalSlices";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitialize = () => {
    dispatch(openDeleteAllModal());
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex justify-between items-center">
      <button
        className="border p-4 rounded-md cursor-pointer"
        onClick={handleInitialize}
      >
        장바구니 초기화
      </button>
      <p className="font-semibold text-lg">총 가격 : {total}원</p>
    </div>
  );
};

export default PriceBox;
