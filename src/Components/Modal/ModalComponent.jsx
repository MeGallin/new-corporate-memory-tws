import React, { useState } from 'react';
import './ModalComponent.scss';

const ModalComponent = ({
  openButtonTitle,
  closeButtonTitle,
  props,
  className,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <>
      {showModal ? (
        <div>
          <div
            title="Close modal"
            className={showModal ? 'modal-overlay' : null}
            onClick={() => setShowModal(false)}
          />
          <div className="modal-wrapper">
            <button
              onClick={() => setShowModal(false)}
              className="confirmation"
            >
              {closeButtonTitle}
            </button>
            {props}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleShowModal}
        className={`${className} modal-btn`}
      >
        {openButtonTitle}
      </button>
    </>
  );
};

export default ModalComponent;
