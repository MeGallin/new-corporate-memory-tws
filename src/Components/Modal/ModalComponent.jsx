import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './ModalComponent.scss';

const ModalComponent = ({ isOpen, onClose, closeButtonTitle, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        {closeButtonTitle && (
          <button onClick={onClose} className="modal-close-button">
            {closeButtonTitle}
          </button>
        )}
        {typeof children === 'function' ? children(onClose) : children}
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  closeButtonTitle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default ModalComponent;
