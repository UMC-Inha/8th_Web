import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const PriceBox = () => {
    const dispatch = useDispatch();
    const { total } = useCartInfo();
    const { clearCart } = useCartActions();

    const handleClickDelete = () => {
        dispatch(openModal({
            message: "모든 장바구니를 삭제하시겠습니까?",
            onConfirm: () => clearCart(),
        }));
    };

    return (
        <div className="p-12 flex justify-between">
            <button 
                className="border p-4 rounded-md cursor-pointer"
                onClick={handleClickDelete}
            >
                전체 장바구니 삭제
            </button>

            <div>
                총 가격 : {total} 원
            </div>
        </div>
    );
};

export default PriceBox;
