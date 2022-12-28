import React, { useState } from 'react';
import './ModalComponent.scss';

import ButtonComponent from '../Button/ButtonComponent';

const ModalComponent = ({
  openButtonTitle,
  closeButtonTitle,
  props,
  variant,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <>
      {showModal ? (
        <>
          <div
            title="Close modal"
            className={showModal ? 'modal-overlay' : null}
            onClick={() => setShowModal(false)}
          />
          <div className="modal-wrapper">
            <button
              onClick={() => setShowModal(false)}
              className="modal-close-button"
            >
              {closeButtonTitle}
            </button>
            {props}
          </div>
        </>
      ) : null}

      <ButtonComponent
        onClick={handleShowModal}
        type="button"
        text={openButtonTitle}
        variant={variant}
        disabled={false}
      />
    </>
  );
};

export default ModalComponent;
