import CartItem from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4">
      <ul className="w-full">
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
