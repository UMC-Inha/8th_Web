import { useAppSelector } from "../hooks/useCustomRedux";
const PriceBox = () => {
  const total = useAppSelector((state) => state.cart.total);

  return (
    <div className="p-12 flex justify-end text-lg font-semibold">
      총 가격: {total}원
    </div>
  );
};

export default PriceBox;
