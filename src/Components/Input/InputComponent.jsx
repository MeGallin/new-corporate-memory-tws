import React, { useState } from 'react';
import './InputComponent.scss';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputComponent = ({
  id = '',
  type = 'text',
  label,
  name,
  value = '',
  placeholder = '',
  error = null,
  className = '',
  onChange,
  ...inputProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordField = type === 'password';
  const currentType = isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type;
  const errorId = id ? `${id}-error` : undefined;
  const describedBy = [inputProps['aria-describedby'], error ? errorId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="input-field-wrapper">
      <div className="input-icon-wrapper">
        {label && <label htmlFor={id}>{label}</label>}
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            title={isPasswordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
            className="password-toggle-icon"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      <input
        id={id}
        type={currentType}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        {...inputProps}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
      />

      {error && <p id={errorId} className="validation-error">{error}</p>}
    </div>
  );
};

InputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  'aria-describedby': PropTypes.string,
};

export default InputComponent;
