import CartItem from "./CartItem";
// import type { RootState } from "../store/store";
// import { useSelector } from "../hooks/useCustomRedux";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
    const { cartItems } = useCartInfo();
    const { clearCart } = useCartActions();

    // const { cartItems, amount, total } = useSelector(
    //     (state) => state.cart
    // );

    return (
        <div className="flex flex-col items-center justify-center">
            {cartItems.length === 0 && (
                <div className="my-10">
                    <p className="text-2xl font-semibold">장바구니가 비어있습니다.</p>
                </div>
            )}
            <ul>
                {cartItems.map((item, index) => (
                    <CartItem
                        key={index}
                        lp={item}
                    />
                ))}
            </ul>
        </div>
    );
};

export default CartList;