import "./FloatingButton.css";

const FloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      +
    </button>
  );
};

export default FloatingButton;
