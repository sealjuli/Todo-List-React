export const ModalWindow = ({
  showModal,
  setShowModal,
  text,
  success,
  navigate,
}) => {
  return (
    <div
      className={showModal ? "modal active" : "modal"}
      onClick={() => {
        setShowModal(false);
        if (success) {
          navigate();
        }
      }}
    >
      <div className="modal__context" onClick={(e) => e.stopPropagation()}>
        <b>{text}</b>
      </div>
    </div>
  );
};
