export const ModalWindow = ({ showModal, setShowModal, text }) => {
  return (
    <div
      className={showModal ? "modal active" : "modal"}
      onClick={() => setShowModal(false)}
    >
      <div className="modal__context" onClick={(e) => e.stopPropagation()}>
        <b>{text}</b>
      </div>
    </div>
  );
};
