import React from 'react';
import './ButtonComponent.scss';
import PropTypes from 'prop-types';

const ButtonComponent = ({ id, type, text, onClick, variant, disabled }) => {
  switch (variant) {
    case 'primary':
      return (
        <button
          className={`${variant}`}
          id={id}
          type={type}
          text={text}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );
    case 'secondary':
      return (
        <button
          className={`${variant}`}
          id={id}
          type={type}
          text={text}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );
    case 'success':
      return (
        <button
          className={`${variant}`}
          id={id}
          type={type}
          text={text}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );
    case 'danger':
      return (
        <button
          className={`${variant}`}
          id={id}
          type={type}
          text={text}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );
    case 'warning':
      return (
        <button
          className={`${variant}`}
          id={id}
          type={type}
          text={text}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );
    case 'info':
      return (
        <button
          className={`${variant}`}
          id={id}
          type={type}
          text={text}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );
    case 'light':
      return (
        <button
          className={`${variant}`}
          id={id}
          type={type}
          text={text}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );
    case 'dark':
      return (
        <button
          className={`${variant}`}
          id={id}
          type={type}
          text={text}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      );

    default:
      break;
  }
};

ButtonComponent.defaultProps = {
  disabled: true,
};

ButtonComponent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonComponent;
