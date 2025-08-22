import React from 'react';
import './ButtonComponent.scss';
import PropTypes from 'prop-types';

const ButtonComponent = ({ id, type, text, onClick, variant, disabled, className }) => {
  const buttonClasses = [variant, className].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

ButtonComponent.defaultProps = {
  disabled: false,
  variant: 'primary',
  className: '',
  type: 'button',
};

ButtonComponent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ButtonComponent;
