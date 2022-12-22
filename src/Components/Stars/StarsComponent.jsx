import './StarsComponent.scss';
import { FaStar } from 'react-icons/fa';

const StarsComponent = ({ priority }) => {
  const numberOfStars = () => {
    const numItems = priority;
    const array = [];
    for (let i = 0; i < numItems; i++) {
      array.push(
        <span key={i} className="start-component-wrapper">
          <FaStar />
        </span>,
      );
    }
    return array;
  };

  return numberOfStars();
};

export default StarsComponent;
