import React, { useRef, useEffect, useState } from 'react';
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
  const inputFocus = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [onlyPassword, setOnlyPassword] = useState(true);

  useEffect(() => {
    if (inputFocus.current.name === 'name') {
      inputFocus.current.focus();
    }
    if (inputFocus.current.type !== 'password') {
      setOnlyPassword(false);
    }
  }, [inputFocus]);

  const handleShowHidePw = () => {
    if (inputFocus.current.type === 'password') {
      setShowPassword((prevState) => !prevState);
      inputFocus.current.type = 'text';
    } else {
      setShowPassword((prevState) => !prevState);
      inputFocus.current.type = 'password';
    }
  };

  return (
    <div className="input-field-wrapper">
      <div className="input-icon-wrapper">
        {label && <label htmlFor="input-field">{label}</label>}
        {onlyPassword ? (
          <div
            onClick={() => handleShowHidePw()}
            title={!showPassword ? 'SHOW PASSWORD' : 'HIDE PASSWORD'}
          >
            {!showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        ) : null}
      </div>
      <input
        id={id}
        ref={inputFocus}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        error={error}
        className={className}
        onChange={onChange}
      />

      {error && <p className="validation-error">{error}</p>}
    </div>
  );
};

InputComponent.defaultProps = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputComponent.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputComponent;
