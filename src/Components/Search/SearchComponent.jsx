import './SearchComponent.scss';
import PropTypes from 'prop-types';

const SearchComponent = ({
  type,
  placeholder,
  handleSearch,
  className,
  value,
  label,
}) => {
  return (
    <>
      <div className="search-input-wrapper">
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          onChange={handleSearch}
          value={value}
          multiple
          required
        />

        <span></span>
        <label>{label}</label>
      </div>
    </>
  );
};

SearchComponent.defaultProps = {
  type: 'search',
};

SearchComponent.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchComponent;
