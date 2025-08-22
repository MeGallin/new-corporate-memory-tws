import React, { useState, useEffect } from 'react';
import './InputComponent.scss';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputComponent = ({
  id,
  type,
  label,
  name,
  value,
  placeholder,
  error,
  className,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordField = type === 'password';
  const currentType = isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="input-field-wrapper">
      <div className="input-icon-wrapper">
        {label && <label htmlFor={id}>{label}</label>}
        {isPasswordField && (
          <div
            onClick={togglePasswordVisibility}
            title={isPasswordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
            className="password-toggle-icon"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </div>
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
      />

      {error && <p className="validation-error">{error}</p>}
    </div>
  );
};

InputComponent.defaultProps = {
  type: 'text',
  className: '',
  placeholder: '',
  error: null,
  id: ''
};

InputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputComponent;
