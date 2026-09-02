import './SearchComponent.scss';
import PropTypes from 'prop-types';

const SearchComponent = ({
  id = '',
  type = 'search',
  placeholder = '',
  onChange,
  className = '',
  value,
  label = '',
  ariaLabel = '',
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
        aria-label={ariaLabel || undefined}
      />
    </div>
  );
};

SearchComponent.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default SearchComponent;
