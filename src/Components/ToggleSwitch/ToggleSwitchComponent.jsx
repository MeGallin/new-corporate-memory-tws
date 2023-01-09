import './ToggleSwitchComponent.scss';
import PropTypes from 'prop-types';

const ToggleSwitchComponent = ({ id, name, checked, onChange }) => {
  return (
    <span>
      <label className="switch">
        <input
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          type="checkbox"
        />
        <span className="slider round"></span>
      </label>
    </span>
  );
};

ToggleSwitchComponent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default ToggleSwitchComponent;
