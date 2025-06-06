import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";

export default function Modal() {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px 32px",
          borderRadius: "10px",
          textAlign: "center",
          minWidth: "280px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>
          정말 삭제하시겠습니까?
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={() => dispatch(closeModal())}
            style={{
              padding: "8px 20px",
              backgroundColor: "#e5e7eb",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            아니요
          </button>
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            style={{
              padding: "8px 20px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
