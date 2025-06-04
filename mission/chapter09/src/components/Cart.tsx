import { useEffect } from "react";
import { useCartStore } from "../app/useCartStore";
import { useModalStore } from "../app/useModalStore";
import Modal from "./Modal";
import "../styles/cart.css";

const Cart = () => {
  const {
    cartItems,
    totalAmount,
    totalQuantity,
    increase,
    decrease,
    removeItem,
    calculateTotals,
  } = useCartStore();

  const { isOpen, openModal } = useModalStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

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
            <button onClick={() => decrease(item.id)}>-</button>
            <span>{item.amount}</span>
            <button onClick={() => increase(item.id)}>+</button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <p>총 수량: {totalQuantity}개</p>
        <p>총 합계: ${totalAmount}</p>
      </div>

      <button className="clear-btn" onClick={openModal}>
        전체 삭제
      </button>

      {isOpen && <Modal />}
    </div>
  );
};

export default Cart;
