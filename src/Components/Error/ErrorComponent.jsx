import React from 'react';
import './ErrorComponent.scss';
import PropTypes from 'prop-types';
import 'animate.css';

const ErrorComponent = ({ error }) => {
  return (
    <div className=" animate__animated animate__bounceInLeft">
      <span className="error-component">{error}</span>
    </div>
  );
};

ErrorComponent.propTypes = {
  error: PropTypes.string,
};
export default ErrorComponent;
