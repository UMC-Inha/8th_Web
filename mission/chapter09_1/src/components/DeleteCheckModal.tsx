import { useDispatch, useSelector } from "../hooks/useCustomRedux"
import { closeModal } from "../slices/modalSlice";

const DeleteCheckModal = () => {
    const dispatch = useDispatch();
    const { isOpen, message, onConfirm } = useSelector((state) => state.modal);

    if(!isOpen) {
        return null;
    }

    const handleConfirm = () => {
        if(onConfirm) {
            onConfirm();
        }

        dispatch(closeModal());
    }

    const handleCancel = () => {
        dispatch(closeModal());
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={handleCancel}
                    >
                        아니오
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleConfirm}
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCheckModal;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      