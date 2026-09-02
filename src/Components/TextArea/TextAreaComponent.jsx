import PropTypes from 'prop-types';
import './TextAreaComponent.scss';

const TextAreaComponent = ({
  id = '',
  name,
  value,
  placeholder = '',
  onChange,
  label = '',
  error = null,
  className = '',
  ...textareaProps
}) => {
  const errorId = id ? `${id}-error` : undefined;
  const describedBy = [textareaProps['aria-describedby'], error ? errorId : null]
    .filter(Boolean)
    .join(' ') || undefined;

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
        {...textareaProps}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
      />
      {error && <p id={errorId} className="validation-error">{error}</p>}
    </div>
  );
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
  required: PropTypes.bool,
  minLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  'aria-describedby': PropTypes.string,
};

export default TextAreaComponent;
