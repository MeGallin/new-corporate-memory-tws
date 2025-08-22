import PropTypes from 'prop-types';
import './TextAreaComponent.scss';

const TextAreaComponent = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  label,
  error,
  className,
}) => {
  return (
    <div className="input-field-wrapper">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
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

TextAreaComponent.defaultProps = {
  id: '',
  placeholder: '',
  label: '',
  error: null,
  className: '',
};

TextAreaComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default TextAreaComponent;
