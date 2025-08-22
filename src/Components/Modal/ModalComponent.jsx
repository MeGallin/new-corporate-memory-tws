import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './ModalComponent.scss';

import ButtonComponent from '../Button/ButtonComponent';

const ModalComponent = ({ openButtonTitle, closeButtonTitle, children, variant }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  const modalContent = showModal ? (
    <>
      <div className="modal-overlay" onClick={handleClose}></div>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="modal-close-button">
          {closeButtonTitle}
        </button>
        {typeof children === 'function' ? children(handleClose) : children}
      </div>
    </>
  ) : null;

  return (
    <>
      <ButtonComponent
        onClick={handleOpen}
        type="button"
        text={openButtonTitle}
        variant={variant}
        disabled={false}
      />
      {ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))}
    </>
  );
};

ModalComponent.propTypes = {
  openButtonTitle: PropTypes.string.isRequired,
  closeButtonTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  variant: PropTypes.string,
};

export default ModalComponent;
