import './StarsComponent.scss';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const StarsComponent = ({ priority }) => {
  const numStars = Math.max(0, Number(priority) || 0);

  return (
    <>
      {Array.from({ length: numStars }, (_, i) => (
        <span key={i} className="start-component-wrapper">
          <FaStar />
        </span>
      ))}
    </>
  );
};

StarsComponent.propTypes = {
  priority: PropTypes.number,
};

export default StarsComponent;
