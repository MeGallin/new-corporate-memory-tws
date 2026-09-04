import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import './ModalComponent.scss';

const ModalComponent = ({
  isOpen,
  onClose,
  ariaLabel = 'Dialog',
  closeButtonTitle = 'Close dialog',
  size = 'standard',
  tone = 'default',
  children,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements?.length) {
          event.preventDefault();
          dialogRef.current?.focus();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <>
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        className={`modal-wrapper modal-wrapper--${size}${
          tone === 'danger' ? ' modal-wrapper--danger' : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex="-1"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="modal-close-button"
          aria-label={closeButtonTitle}
          title={closeButtonTitle}
        >
          <FaTimes aria-hidden="true" />
        </button>
        <div className="modal-content">
          {typeof children === 'function' ? children(onClose) : children}
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root'),
  );
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  closeButtonTitle: PropTypes.string,
  size: PropTypes.oneOf(['compact', 'standard', 'media']),
  tone: PropTypes.oneOf(['default', 'danger']),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default ModalComponent;
