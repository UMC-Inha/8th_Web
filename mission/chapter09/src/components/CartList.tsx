import { useSelector } from "../hooks/useCustomRedux";
import { useCartInfo } from "../store/useCartStore";
import CartItem from "./CartItem";

export const CartList = () => {
  // // redux-toolkit
  // const { cartItems } = useSelector((state) => state.cart);

  //zustand
  const {cartItems} = useCartInfo();

  return (
    <div className="flex flex-col items-center justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};
