import { useEffect } from 'react';
import './SuccessComponent.scss';
import PropTypes from 'prop-types';
import 'animate.css';

const SuccessComponent = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-message-container animate__animated animate__bounceInLeft">
      <span className="success-component">{message}</span>
    </div>
  );
};

SuccessComponent.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessComponent;
