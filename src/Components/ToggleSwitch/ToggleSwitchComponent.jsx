import './ToggleSwitchComponent.scss';
import PropTypes from 'prop-types';

const ToggleSwitchComponent = ({
  id,
  name,
  ariaLabel,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <label className="switch">
      <input
        id={id}
        name={name}
        aria-label={ariaLabel}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        type="checkbox"
      />
      <span className="slider round"></span>
    </label>
  );
};

ToggleSwitchComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitchComponent;
