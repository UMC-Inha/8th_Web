import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import DeleteAccountModal from "./DeleteAccountModal";
import "./Sidebar.css";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteUserMutation = useMutation(
    () => axiosInstance.delete("/v1/users"),
    {
      onSuccess: () => {
        alert("회원 탈퇴가 완료되었습니다.");
        localStorage.clear();
        window.location.href = "/login";
      },
      onError: () => {
        alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
      },
    }
  );

  const handleDelete = () => {
    deleteUserMutation.mutate();
  };

  return (
    <>
      {isOpen && <div onClick={onClose} className="sidebar-overlay" />}
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-title">DOLIGO</div>
        <nav className="sidebar-nav">
          <Link to="/search" onClick={onClose} className="sidebar-link">
            🔍 찾기
          </Link>
          <Link to="/mypage" onClick={onClose} className="sidebar-link">
            👤 마이페이지
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button
            className="delete-account-button"
            onClick={() => setShowConfirm(true)}
          >
            탈퇴하기
          </button>
        </div>

        {showConfirm && (
          <DeleteAccountModal
            message="정말 탈퇴하시겠습니까?"
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
