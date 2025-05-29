import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
  increase,
  decrease,
  removeItem,
  calculateTotals,
} from "../features/cart/cartSlice";
import { useEffect } from "react";
import { openModal } from "../features/modal/modalSlice";
import Modal from "./Modal";
import "../styles/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );
  const { isOpen } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="cart">
      <div className="cart-header">
        <h1 className="title">
          <span className="highlight">더기</span>의 장바구니
        </h1>
        <div className="cart-icon">
          🛒<span className="cart-count">{totalQuantity}</span>
        </div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.img} alt={item.title} className="item-img" />
          <div className="item-info">
            <h3>{item.title}</h3>
            <p>{item.singer}</p>
            <strong>${item.price}</strong>
          </div>
          <div className="item-actions">
            <button onClick={() => dispatch(decrease(item.id))}>-</button>
            <span>{item.amount}</span>
            <button onClick={() => dispatch(increase(item.id))}>+</button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <p>총 수량: {totalQuantity}개</p>
        <p>총 합계: ${totalAmount}</p>
      </div>

      <button className="clear-btn" onClick={() => dispatch(openModal())}>
        전체 삭제
      </button>

      {isOpen && <Modal />}
    </div>
  );
};

export default Cart;
