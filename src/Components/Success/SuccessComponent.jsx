import { useState, useEffect } from 'react';
import './SuccessComponent.scss';
import PropTypes from 'prop-types';
import 'animate.css';

const SuccessComponent = ({ message }) => {
  const [clear, setClear] = useState('');
  useEffect(() => {
    const interval = setTimeout(() => {
      setClear('clear');
    }, 6000);
    return () => clearInterval(interval);
  }, [clear]);

  return (
    <div className="animate__animated animate__bounceInLeft">
      <span className={`success-component ${clear}`}>{message}</span>
    </div>
  );
};
SuccessComponent.propTypes = {
  message: PropTypes.string,
};
export default SuccessComponent;
