import './StarsComponent.scss';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const StarsComponent = ({ priority }) => {
  const numStars = Math.max(0, Number(priority) || 0);

  return (
    <div
      className="stars-component"
      aria-label={`${numStars} out of 5 priority stars`}
    >
      {Array.from({ length: numStars }, (_, i) => (
        <span key={i} className="start-component-wrapper">
          <FaStar />
        </span>
      ))}
    </div>
  );
};

StarsComponent.propTypes = {
  priority: PropTypes.number,
};

export default StarsComponent;
