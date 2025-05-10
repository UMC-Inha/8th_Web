import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      {isOpen && <div onClick={onClose} className="sidebar-overlay" />}
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-title">DOLIGO</div>
        <nav className="sidebar-nav">
          <Link to="/" onClick={onClose} className="sidebar-link">
            🔍 찾기
          </Link>
          <Link to="/mypage" onClick={onClose} className="sidebar-link">
            👤 마이페이지
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
