import React from 'react';
import './ButtonComponent.scss';
import PropTypes from 'prop-types';

const ButtonComponent = ({
  id,
  type = 'button',
  text,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  ...buttonProps
}) => {
  const buttonClasses = [variant, className].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...buttonProps}
    >
      {text}
    </button>
  );
};

ButtonComponent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  'aria-expanded': PropTypes.bool,
  'aria-controls': PropTypes.string,
};

export default ButtonComponent;
