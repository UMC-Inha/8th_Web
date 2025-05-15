import { useState } from "react";
import LPListPage from "./LPListPage";
import FloatingButton from "../components/FloatingButton";
import CreateLPModal from "../components/CreateLPModal";

const LPListPageWithModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <LPListPage />
      <FloatingButton onClick={() => setShowModal(true)} />
      {showModal && <CreateLPModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default LPListPageWithModal;
