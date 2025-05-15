import "./DeleteAccountModal.css";

interface DeleteAccountModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteAccountModal = ({
  message,
  onConfirm,
  onCancel,
}: DeleteAccountModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onCancel}>
          ✕
        </button>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-button confirm" onClick={onConfirm}>
            예
          </button>
          <button className="modal-button cancel" onClick={onCancel}>
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
