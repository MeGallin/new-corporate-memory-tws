import './SearchComponent.scss';
import PropTypes from 'prop-types';

const SearchComponent = ({
  id,
  type,
  placeholder,
  onChange,
  className,
  value,
  label,
}) => {
  return (
    <div className="search-input-wrapper">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

SearchComponent.defaultProps = {
  id: '',
  type: 'search',
  className: '',
  placeholder: '',
  label: '',
};

SearchComponent.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default SearchComponent;
