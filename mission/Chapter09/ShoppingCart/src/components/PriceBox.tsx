import { useCartStore } from "../hooks/useCartStore";
const PriceBox = () => {
  const total = useCartStore((state) => state.total);

  return (
    <div className="p-12 flex justify-end text-lg font-semibold">
      총 가격: {total}원
    </div>
  );
};

export default PriceBox;
